import{_ as s,e as a,k as e,o as i}from"./app-CY03Lsxp.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="作为输入参数" tabindex="-1"><a class="header-anchor" href="#作为输入参数"><span>作为输入参数</span></a></h1><p>虽然 Rust 无需类型说明就能在大多数时候完成变量捕获，但在编写函数时，这种模糊写法是不允许的。当以闭包作为输入参数时，必须指出闭包的完整类型，它是通过使用以下 <code>trait</code> 中的一种来指定的。其受限制程度按以下顺序递减：</p><ul><li><code>Fn</code>：表示捕获方式为通过引用（<code>&amp;T</code>）的闭包</li><li><code>FnMut</code>：表示捕获方式为通过可变引用（<code>&amp;mut T</code>）的闭包</li><li><code>FnOnce</code>：表示捕获方式为通过值（<code>T</code>）的闭包</li></ul><blockquote><p>译注：顺序之所以是这样，是因为 <code>&amp;T</code> 只是获取了不可变的引用，<code>&amp;mut T</code> 则可以改变变量，<code>T</code> 则是拿到了变量的所有权而非借用。</p></blockquote><p>对闭包所要捕获的每个变量，编译器都将以限制最少的方式来捕获。</p><blockquote><p>译注：这句可能说得不对，事实上是在满足使用需求的前提下尽量以限制最多的方式捕获。</p></blockquote><p>例如用一个类型说明为 <code>FnOnce</code> 的闭包作为参数。这说明闭包可能采取 <code>&amp;T</code>，<code>&amp;mut T</code> 或 <code>T</code> 中的一种捕获方式，但编译器最终是根据所捕获变量在闭包里的使用情况决定捕获方式。</p><p>这是因为如果能以移动的方式捕获变量，则闭包也有能力使用其他方式借用变量。注意反过来就不再成立：如果参数的类型说明是 <code>Fn</code>，那么不允许该闭包通过 <code>&amp;mut T</code> 或 <code>T</code> 捕获变量。</p><p>在下面的例子中，试着分别用一用 <code>Fn</code>、<code>FnMut</code> 和 <code>FnOnce</code>，看看会发生什么：</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 该函数将闭包作为参数并调用它。</span></span>
<span class="line"><span>fn apply&lt;F&gt;(f: F) where</span></span>
<span class="line"><span>    // 闭包没有输入值和返回值。</span></span>
<span class="line"><span>    F: FnOnce() {</span></span>
<span class="line"><span>    // ^ 试一试：将 \`FnOnce\` 换成 \`Fn\` 或 \`FnMut\`。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    f();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 输入闭包，返回一个 \`i32\` 整型的函数。</span></span>
<span class="line"><span>fn apply_to_3&lt;F&gt;(f: F) -&gt; i32 where</span></span>
<span class="line"><span>    // 闭包处理一个 \`i32\` 整型并返回一个 \`i32\` 整型。</span></span>
<span class="line"><span>    F: Fn(i32) -&gt; i32 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    f(3)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    use std::mem;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let greeting = &quot;hello&quot;;</span></span>
<span class="line"><span>    // 不可复制的类型。</span></span>
<span class="line"><span>    // \`to_owned\` 从借用的数据创建有所有权的数据。</span></span>
<span class="line"><span>    let mut farewell = &quot;goodbye&quot;.to_owned();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 捕获 2 个变量：通过引用捕获 \`greeting\`，通过值捕获 \`farewell\`。</span></span>
<span class="line"><span>    let diary = || {</span></span>
<span class="line"><span>        // \`greeting\` 通过引用捕获，故需要闭包是 \`Fn\`。</span></span>
<span class="line"><span>        println!(&quot;I said {}.&quot;, greeting);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 下文改变了 \`farewell\` ，因而要求闭包通过可变引用来捕获它。</span></span>
<span class="line"><span>        // 现在需要 \`FnMut\`。</span></span>
<span class="line"><span>        farewell.push_str(&quot;!!!&quot;);</span></span>
<span class="line"><span>        println!(&quot;Then I screamed {}.&quot;, farewell);</span></span>
<span class="line"><span>        println!(&quot;Now I can sleep. zzzzz&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 手动调用 drop 又要求闭包通过值获取 \`farewell\`。</span></span>
<span class="line"><span>        // 现在需要 \`FnOnce\`。</span></span>
<span class="line"><span>        mem::drop(farewell);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 以闭包作为参数，调用函数 \`apply\`。</span></span>
<span class="line"><span>    apply(diary);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 闭包 \`double\` 满足 \`apply_to_3\` 的 trait 约束。</span></span>
<span class="line"><span>    let double = |x| 2 * x;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    println!(&quot;3 doubled: {}&quot;, apply_to_3(double));</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参见" tabindex="-1"><a class="header-anchor" href="#参见"><span>参见：</span></a></h3><p><a href="https://rustwiki.org/zh-CN/std/mem/fn.drop.html" target="_blank" rel="noopener noreferrer"><code>std::mem::drop</code></a>, <a href="https://rustwiki.org/zh-CN/std/ops/trait.Fn.html" target="_blank" rel="noopener noreferrer"><code>Fn</code></a>, <a href="https://rustwiki.org/zh-CN/std/ops/trait.FnMut.html" target="_blank" rel="noopener noreferrer"><code>FnMut</code></a>, 和 <a href="https://rustwiki.org/zh-CN/std/ops/trait.FnOnce.html" target="_blank" rel="noopener noreferrer"><code>FnOnce</code></a></p>`,12)]))}const d=s(l,[["render",p],["__file","input_parameters.html.vue"]]),r=JSON.parse('{"path":"/fn/closures/input_parameters.html","title":"作为输入参数","lang":"zh-CN","frontmatter":{"description":"作为输入参数 虽然 Rust 无需类型说明就能在大多数时候完成变量捕获，但在编写函数时，这种模糊写法是不允许的。当以闭包作为输入参数时，必须指出闭包的完整类型，它是通过使用以下 trait 中的一种来指定的。其受限制程度按以下顺序递减： Fn：表示捕获方式为通过引用（&T）的闭包 FnMut：表示捕获方式为通过可变引用（&mut T）的闭包 FnOnc...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn/fn/closures/input_parameters.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn"}],["meta",{"property":"og:title","content":"作为输入参数"}],["meta",{"property":"og:description","content":"作为输入参数 虽然 Rust 无需类型说明就能在大多数时候完成变量捕获，但在编写函数时，这种模糊写法是不允许的。当以闭包作为输入参数时，必须指出闭包的完整类型，它是通过使用以下 trait 中的一种来指定的。其受限制程度按以下顺序递减： Fn：表示捕获方式为通过引用（&T）的闭包 FnMut：表示捕获方式为通过可变引用（&mut T）的闭包 FnOnc..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"作为输入参数\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn/\\"}]}"]]},"git":{},"readingTime":{"minutes":2.46,"words":739},"filePathRelative":"fn/closures/input_parameters.md","excerpt":"\\n<p>虽然 Rust 无需类型说明就能在大多数时候完成变量捕获，但在编写函数时，这种模糊写法是不允许的。当以闭包作为输入参数时，必须指出闭包的完整类型，它是通过使用以下 <code>trait</code> 中的一种来指定的。其受限制程度按以下顺序递减：</p>\\n<ul>\\n<li><code>Fn</code>：表示捕获方式为通过引用（<code>&amp;T</code>）的闭包</li>\\n<li><code>FnMut</code>：表示捕获方式为通过可变引用（<code>&amp;mut T</code>）的闭包</li>\\n<li><code>FnOnce</code>：表示捕获方式为通过值（<code>T</code>）的闭包</li>\\n</ul>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"fn/closures/input_parameters.md","value":{"title":"input_parameters","path":"fn/closures/input_parameters.md","outlink":[],"backlink":["SUMMARY.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"fn/closures/input_parameters.md"}]}}}');export{d as comp,r as data};
