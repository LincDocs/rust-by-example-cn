import{_ as n,e as a,k as e,o as i}from"./app-CVSWwIkE.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="测试实例-map-reduce" tabindex="-1"><a class="header-anchor" href="#测试实例-map-reduce"><span>测试实例：map-reduce</span></a></h1><p>Rust 使数据的并行化处理非常简单，在 Rust 中你无需面对并行处理的很多传统难题。</p><p>标准库提供了开箱即用的线程类型，把它和 Rust 的所有权概念与别名规则结合起来，可以自动地避免数据竞争（data race）。</p><p>当某状态对某线程是可见的，别名规则（即一个可变引用 XOR 一些只读引用。译注：XOR<br> 是异或的意思，即「二者仅居其一」）就自动地避免了别的线程对它的操作。（当需要同步处理时，请使用 <code>Mutex</code> 或 <code>Channel</code> 这样的同步类型。）</p><p>在本例中，我们将会计算一堆数字中每一位的和。我们将把它们分成几块，放入不同的线程。每个线程会把自己那一块数字的每一位加起来，之后我们再把每个线程提供的结果再加起来。</p><p>注意到，虽然我们在线程之间传递了引用，但 Rust 理解我们是在传递只读的引用，因此不会发生数据竞争等不安全的事情。另外，因为我们把数据块 <code>move</code> 到了线程中，Rust<br> 会保证数据存活至线程退出，因此不会产生悬挂指针。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>use std::thread;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 这是 \`main\` 线程</span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 这是我们要处理的数据。</span></span>
<span class="line"><span>    // 我们会通过线程实现 map-reduce 算法，从而计算每一位的和</span></span>
<span class="line"><span>    // 每个用空白符隔开的块都会分配给单独的线程来处理</span></span>
<span class="line"><span>    //</span></span>
<span class="line"><span>    // 试一试：插入空格，看看输出会怎样变化！</span></span>
<span class="line"><span>    let data = &quot;86967897737416471853297327050364959</span></span>
<span class="line"><span>11861322575564723963297542624962850</span></span>
<span class="line"><span>70856234701860851907960690014725639</span></span>
<span class="line"><span>38397966707106094172783238747669219</span></span>
<span class="line"><span>52380795257888236525459303330302837</span></span>
<span class="line"><span>58495327135744041048897885734297812</span></span>
<span class="line"><span>69920216438980873548808413720956532</span></span>
<span class="line"><span>16278424637452589860345374828574668&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 创建一个向量，用于储存将要创建的子线程</span></span>
<span class="line"><span>    let mut children = vec![];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /*************************************************************************</span></span>
<span class="line"><span>     * &quot;Map&quot; 阶段</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * 把数据分段，并进行初始化处理</span></span>
<span class="line"><span>     ************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 把数据分段，每段将会单独计算</span></span>
<span class="line"><span>    // 每段都是完整数据的一个引用（&amp;str）</span></span>
<span class="line"><span>    let chunked_data = data.split_whitespace();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 对分段的数据进行迭代。</span></span>
<span class="line"><span>    // .enumerate() 会把当前的迭代计数与被迭代的元素以元组 (index, element)</span></span>
<span class="line"><span>    // 的形式返回。接着立即使用 “解构赋值” 将该元组解构成两个变量，</span></span>
<span class="line"><span>    // \`i\` 和 \`data_segment\`。</span></span>
<span class="line"><span>    for (i, data_segment) in chunked_data.enumerate() {</span></span>
<span class="line"><span>        println!(&quot;data segment {} is \\&quot;{}\\&quot;&quot;, i, data_segment);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 用单独的线程处理每一段数据</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        // spawn() 返回新线程的句柄（handle），我们必须拥有句柄，</span></span>
<span class="line"><span>        // 才能获取线程的返回值。</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        // &#39;move || -&gt; u32&#39; 语法表示该闭包：</span></span>
<span class="line"><span>        // * 没有参数（&#39;||&#39;）</span></span>
<span class="line"><span>        // * 会获取所捕获变量的所有权（&#39;move&#39;）</span></span>
<span class="line"><span>        // * 返回无符号 32 位整数（&#39;-&gt; u32&#39;）</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        // Rust 可以根据闭包的内容推断出 &#39;-&gt; u32&#39;，所以我们可以不写它。</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        // 试一试：删除 &#39;move&#39;，看看会发生什么</span></span>
<span class="line"><span>        children.push(thread::spawn(move || -&gt; u32 {</span></span>
<span class="line"><span>            // 计算该段的每一位的和：</span></span>
<span class="line"><span>            let result = data_segment</span></span>
<span class="line"><span>                        // 对该段中的字符进行迭代..</span></span>
<span class="line"><span>                        .chars()</span></span>
<span class="line"><span>                        // ..把字符转成数字..</span></span>
<span class="line"><span>                        .map(|c| c.to_digit(10).expect(&quot;should be a digit&quot;))</span></span>
<span class="line"><span>                        // ..对返回的数字类型的迭代器求和</span></span>
<span class="line"><span>                        .sum();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // println! 会锁住标准输出，这样各线程打印的内容不会交错在一起</span></span>
<span class="line"><span>            println!(&quot;processed segment {}, result={}&quot;, i, result);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 不需要 “return”，因为 Rust 是一种 “表达式语言”，每个代码块中</span></span>
<span class="line"><span>            // 最后求值的表达式就是代码块的值。</span></span>
<span class="line"><span>            result</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /*************************************************************************</span></span>
<span class="line"><span>     * &quot;Reduce&quot; 阶段</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * 收集中间结果，得出最终结果</span></span>
<span class="line"><span>     ************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 把每个线程产生的中间结果收入一个新的向量中</span></span>
<span class="line"><span>    let mut intermediate_sums = vec![];</span></span>
<span class="line"><span>    for child in children {</span></span>
<span class="line"><span>        // 收集每个子线程的返回值</span></span>
<span class="line"><span>        let intermediate_sum = child.join().unwrap();</span></span>
<span class="line"><span>        intermediate_sums.push(intermediate_sum);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 把所有中间结果加起来，得到最终结果</span></span>
<span class="line"><span>    //</span></span>
<span class="line"><span>    // 我们用 “涡轮鱼” 写法 ::&lt;&gt; 来为 sum() 提供类型提示。</span></span>
<span class="line"><span>    //</span></span>
<span class="line"><span>    // 试一试：不使用涡轮鱼写法，而是显式地指定 intermediate_sums 的类型</span></span>
<span class="line"><span>    let final_result = intermediate_sums.iter().sum::&lt;u32&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    println!(&quot;Final sum result: {}&quot;, final_result);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作业" tabindex="-1"><a class="header-anchor" href="#作业"><span>作业</span></a></h3><p>根据用户输入的数据来决定线程的数量是不明智的。如果用户输入的数据中有一大堆空格怎么办？我们<strong>真的</strong>想要创建 2000 个线程吗？</p><p>请修改程序，使得数据总是被分成有限数目的段，这个数目是由程序开头的静态常量决定的。</p><h3 id="参见" tabindex="-1"><a class="header-anchor" href="#参见"><span>参见:</span></a></h3><ul><li><div class="ab-note drop-shadow"><div class="markdown-rendered"><div><ul><li>[向量][vectors]和[迭代器][iterators]</li></ul></div></div></div></li><li><div class="ab-note drop-shadow"><div class="markdown-rendered"><div><ul><li>[解构][destructuring]赋值</li></ul></div></div></div></li><li>使用<a href="https://rustwiki.org/zh-CN/std/iter/trait.Iterator.html#method.collect" target="_blank" rel="noopener noreferrer">涡轮鱼写法</a>帮助类型推断</li><li><div class="ab-note drop-shadow"><div class="markdown-rendered"><div><ul><li>[枚举类型][enumerate]</li></ul></div></div></div></li></ul>`,12)]))}const t=n(l,[["render",p],["__file","testcase_mapreduce.html.vue"]]),r=JSON.parse('{"path":"/std_misc/threads/testcase_mapreduce.html","title":"测试实例：map-reduce","lang":"zh-CN","frontmatter":{"description":"测试实例：map-reduce Rust 使数据的并行化处理非常简单，在 Rust 中你无需面对并行处理的很多传统难题。 标准库提供了开箱即用的线程类型，把它和 Rust 的所有权概念与别名规则结合起来，可以自动地避免数据竞争（data race）。 当某状态对某线程是可见的，别名规则（即一个可变引用 XOR 一些只读引用。译注：XOR 是异或的意思，...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn-/std_misc/threads/testcase_mapreduce.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn-"}],["meta",{"property":"og:title","content":"测试实例：map-reduce"}],["meta",{"property":"og:description","content":"测试实例：map-reduce Rust 使数据的并行化处理非常简单，在 Rust 中你无需面对并行处理的很多传统难题。 标准库提供了开箱即用的线程类型，把它和 Rust 的所有权概念与别名规则结合起来，可以自动地避免数据竞争（data race）。 当某状态对某线程是可见的，别名规则（即一个可变引用 XOR 一些只读引用。译注：XOR 是异或的意思，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"测试实例：map-reduce\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn-/\\"}]}"]]},"git":{},"readingTime":{"minutes":3.96,"words":1187},"filePathRelative":"std_misc/threads/testcase_mapreduce.md","excerpt":"\\n<p>Rust 使数据的并行化处理非常简单，在 Rust 中你无需面对并行处理的很多传统难题。</p>\\n<p>标准库提供了开箱即用的线程类型，把它和 Rust 的所有权概念与别名规则结合起来，可以自动地避免数据竞争（data race）。</p>\\n<p>当某状态对某线程是可见的，别名规则（即一个可变引用 XOR 一些只读引用。译注：XOR<br>\\n是异或的意思，即「二者仅居其一」）就自动地避免了别的线程对它的操作。（当需要同步处理时，请使用 <code>Mutex</code> 或 <code>Channel</code> 这样的同步类型。）</p>\\n<p>在本例中，我们将会计算一堆数字中每一位的和。我们将把它们分成几块，放入不同的线程。每个线程会把自己那一块数字的每一位加起来，之后我们再把每个线程提供的结果再加起来。</p>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"std_misc/threads/testcase_mapreduce.md","value":{"title":"testcase_mapreduce","path":"std_misc/threads/testcase_mapreduce.md","outlink":[],"backlink":["SUMMARY.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"std_misc/threads/testcase_mapreduce.md"}]}}}');export{t as comp,r as data};
