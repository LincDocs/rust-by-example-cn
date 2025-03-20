import{_ as s,e as a,k as e,o as i}from"./app-CVSWwIkE.js";const l={};function t(p,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="iterator" tabindex="-1"><a class="header-anchor" href="#iterator"><span>Iterator</span></a></h1><p><code>Iterator</code> trait 用来对集合（collection）类型（比如数组）实现迭代器。</p><p>这个 trait 只需定义一个返回 <code>next</code>（下一个）元素的方法，这可手动在 <code>impl</code> 代码块中定义，或者自动定义（比如在数组或区间中）。</p><p>为方便起见，<code>for</code> 结构会使用 <a href="https://rustwiki.org/zh-CN/std/iter/trait.IntoIterator.html" target="_blank" rel="noopener noreferrer"><code>.into_iter()</code></a> 方法将一些集合类型转换为迭代器。</p><p>下面例子展示了如何使用 <code>Iterator</code> trait 的方法，更多可用的方法可以看<a href="https://rustwiki.org/zh-CN/core/iter/trait.Iterator.html" target="_blank" rel="noopener noreferrer">这里</a>。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>struct Fibonacci {</span></span>
<span class="line"><span>    curr: u32,</span></span>
<span class="line"><span>    next: u32,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 为 \`Fibonacci\`（斐波那契）实现 \`Iterator\`。</span></span>
<span class="line"><span>// \`Iterator\` trait 只需定义一个能返回 \`next\`（下一个）元素的方法。</span></span>
<span class="line"><span>impl Iterator for Fibonacci {</span></span>
<span class="line"><span>    type Item = u32;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 我们在这里使用 \`.curr\` 和 \`.next\` 来定义数列（sequence）。</span></span>
<span class="line"><span>    // 返回类型为 \`Option&lt;T&gt;\`：</span></span>
<span class="line"><span>    //     * 当 \`Iterator\` 结束时，返回 \`None\`。</span></span>
<span class="line"><span>    //     * 其他情况，返回被 \`Some\` 包裹（wrap）的下一个值。</span></span>
<span class="line"><span>    fn next(&amp;mut self) -&gt; Option&lt;u32&gt; {</span></span>
<span class="line"><span>        let new_next = self.curr + self.next;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        self.curr = self.next;</span></span>
<span class="line"><span>        self.next = new_next;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 既然斐波那契数列不存在终点，那么 \`Iterator\` 将不可能</span></span>
<span class="line"><span>        // 返回 \`None\`，而总是返回 \`Some\`。</span></span>
<span class="line"><span>        Some(self.curr)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 返回一个斐波那契数列生成器</span></span>
<span class="line"><span>fn fibonacci() -&gt; Fibonacci {</span></span>
<span class="line"><span>    Fibonacci { curr: 1, next: 1 }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    // \`0..3\` 是一个 \`Iterator\`，会产生：0、1 和 2。</span></span>
<span class="line"><span>    let mut sequence = 0..3;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    println!(&quot;Four consecutive \`next\` calls on 0..3&quot;);</span></span>
<span class="line"><span>    println!(&quot;&gt; {:?}&quot;, sequence.next());</span></span>
<span class="line"><span>    println!(&quot;&gt; {:?}&quot;, sequence.next());</span></span>
<span class="line"><span>    println!(&quot;&gt; {:?}&quot;, sequence.next());</span></span>
<span class="line"><span>    println!(&quot;&gt; {:?}&quot;, sequence.next());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // \`for\` 遍历 \`Iterator\` 直到返回 \`None\`，</span></span>
<span class="line"><span>    // 并且每个 \`Some\` 值都被解包（unwrap），然后绑定给一个变量（这里是 \`i\`）。       </span></span>
<span class="line"><span>    println!(&quot;Iterate through 0..3 using \`for\`&quot;);</span></span>
<span class="line"><span>    for i in 0..3 {</span></span>
<span class="line"><span>        println!(&quot;&gt; {}&quot;, i);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // \`take(n)\` 方法提取 \`Iterator\` 的前 \`n\` 项。</span></span>
<span class="line"><span>    println!(&quot;The first four terms of the Fibonacci sequence are: &quot;);</span></span>
<span class="line"><span>    for i in fibonacci().take(4) {</span></span>
<span class="line"><span>        println!(&quot;&gt; {}&quot;, i);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // \`skip(n)\` 方法移除前 \`n\` 项，从而缩短了 \`Iterator\` 。</span></span>
<span class="line"><span>    println!(&quot;The next four terms of the Fibonacci sequence are: &quot;);</span></span>
<span class="line"><span>    for i in fibonacci().skip(4).take(4) {</span></span>
<span class="line"><span>        println!(&quot;&gt; {}&quot;, i);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let array = [1u32, 3, 3, 7];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // \`iter\` 方法对数组/slice 产生一个 \`Iterator\`。</span></span>
<span class="line"><span>    println!(&quot;Iterate the following array {:?}&quot;, &amp;array);</span></span>
<span class="line"><span>    for i in array.iter() {</span></span>
<span class="line"><span>        println!(&quot;&gt; {}&quot;, i);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const c=s(l,[["render",t],["__file","iter.html.vue"]]),o=JSON.parse('{"path":"/trait/iter.html","title":"Iterator","lang":"zh-CN","frontmatter":{"description":"Iterator Iterator trait 用来对集合（collection）类型（比如数组）实现迭代器。 这个 trait 只需定义一个返回 next（下一个）元素的方法，这可手动在 impl 代码块中定义，或者自动定义（比如在数组或区间中）。 为方便起见，for 结构会使用 .into_iter() 方法将一些集合类型转换为迭代器。 下面例子展...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn-/trait/iter.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn-"}],["meta",{"property":"og:title","content":"Iterator"}],["meta",{"property":"og:description","content":"Iterator Iterator trait 用来对集合（collection）类型（比如数组）实现迭代器。 这个 trait 只需定义一个返回 next（下一个）元素的方法，这可手动在 impl 代码块中定义，或者自动定义（比如在数组或区间中）。 为方便起见，for 结构会使用 .into_iter() 方法将一些集合类型转换为迭代器。 下面例子展..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Iterator\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn-/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.59,"words":476},"filePathRelative":"trait/iter.md","excerpt":"\\n<p><code>Iterator</code> trait 用来对集合（collection）类型（比如数组）实现迭代器。</p>\\n<p>这个 trait 只需定义一个返回 <code>next</code>（下一个）元素的方法，这可手动在 <code>impl</code> 代码块中定义，或者自动定义（比如在数组或区间中）。</p>\\n<p>为方便起见，<code>for</code> 结构会使用 <a href=\\"https://rustwiki.org/zh-CN/std/iter/trait.IntoIterator.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"><code>.into_iter()</code></a> 方法将一些集合类型转换为迭代器。</p>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"},{"title":"for","link":"flow_control/for.html"}],"localMap":{"nodes":[{"id":"trait/iter.md","value":{"title":"iter","path":"trait/iter.md","outlink":[],"backlink":["SUMMARY.md","flow_control/for.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}},{"id":"flow_control/for.md","value":{"title":"for","path":"flow_control/for.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"trait/iter.md"},{"source":"flow_control/for.md","target":"trait/iter.md"}]}}}');export{c as comp,o as data};
