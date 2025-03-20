import{_ as n,e as a,k as e,o as i}from"./app-CY03Lsxp.js";const t={};function p(l,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="运算符重载" tabindex="-1"><a class="header-anchor" href="#运算符重载"><span>运算符重载</span></a></h1><p>在 Rust 中，很多运算符可以通过 trait 来重载。也就是说，这些运算符可以根据它们的输入参数来完成不同的任务。这之所以可行，是因为运算符就是方法调用的语法糖。例如，<code>a + b</code> 中的 <code>+</code> 运算符会调用 <code>add</code> 方法（也就是 <code>a.add(b)</code>）。这个 <code>add</code> 方法是 <code>Add</code> trait 的一部分。因此，<code>+</code> 运算符可以被任何 <code>Add</code> trait 的实现者使用。</p><p>会重载运算符的 <code>trait</code>（比如 <code>Add</code> 这种）可以在<a href="https://rustwiki.org/zh-CN/core/ops/" target="_blank" rel="noopener noreferrer">这里</a>查看。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>use std::ops;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct Foo;</span></span>
<span class="line"><span>struct Bar;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#[derive(Debug)]</span></span>
<span class="line"><span>struct FooBar;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#[derive(Debug)]</span></span>
<span class="line"><span>struct BarFoo;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// \`std::ops::Add\` trait 用来指明 \`+\` 的功能，这里我们实现 \`Add&lt;Bar&gt;\`，它是用于</span></span>
<span class="line"><span>// 把对象和 \`Bar\` 类型的右操作数（RHS）加起来的 \`trait\`。</span></span>
<span class="line"><span>// 下面的代码块实现了 \`Foo + Bar = FooBar\` 这样的运算。</span></span>
<span class="line"><span>impl ops::Add&lt;Bar&gt; for Foo {</span></span>
<span class="line"><span>    type Output = FooBar;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn add(self, _rhs: Bar) -&gt; FooBar {</span></span>
<span class="line"><span>        println!(&quot;&gt; Foo.add(Bar) was called&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        FooBar</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 通过颠倒类型，我们实现了不服从交换律的加法。</span></span>
<span class="line"><span>// 这里我们实现 \`Add&lt;Foo&gt;\`，它是用于把对象和 \`Foo\` 类型的右操作数加起来的 trait。</span></span>
<span class="line"><span>// 下面的代码块实现了 \`Bar + Foo = BarFoo\` 这样的运算。</span></span>
<span class="line"><span>impl ops::Add&lt;Foo&gt; for Bar {</span></span>
<span class="line"><span>    type Output = BarFoo;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn add(self, _rhs: Foo) -&gt; BarFoo {</span></span>
<span class="line"><span>        println!(&quot;&gt; Bar.add(Foo) was called&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BarFoo</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    println!(&quot;Foo + Bar = {:?}&quot;, Foo + Bar);</span></span>
<span class="line"><span>    println!(&quot;Bar + Foo = {:?}&quot;, Bar + Foo);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参见" tabindex="-1"><a class="header-anchor" href="#参见"><span>参见：</span></a></h3><p><a href="https://rustwiki.org/zh-CN/core/ops/trait.Add.html" target="_blank" rel="noopener noreferrer">Add</a>, <a href="https://rustwiki.org/zh-CN/book/appendix-02-operators.html" target="_blank" rel="noopener noreferrer">语法索引</a></p>`,6)]))}const r=n(t,[["render",p],["__file","ops.html.vue"]]),o=JSON.parse('{"path":"/trait/ops.html","title":"运算符重载","lang":"zh-CN","frontmatter":{"description":"运算符重载 在 Rust 中，很多运算符可以通过 trait 来重载。也就是说，这些运算符可以根据它们的输入参数来完成不同的任务。这之所以可行，是因为运算符就是方法调用的语法糖。例如，a + b 中的 + 运算符会调用 add 方法（也就是 a.add(b)）。这个 add 方法是 Add trait 的一部分。因此，+ 运算符可以被任何 Add tr...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn/trait/ops.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn"}],["meta",{"property":"og:title","content":"运算符重载"}],["meta",{"property":"og:description","content":"运算符重载 在 Rust 中，很多运算符可以通过 trait 来重载。也就是说，这些运算符可以根据它们的输入参数来完成不同的任务。这之所以可行，是因为运算符就是方法调用的语法糖。例如，a + b 中的 + 运算符会调用 add 方法（也就是 a.add(b)）。这个 add 方法是 Add trait 的一部分。因此，+ 运算符可以被任何 Add tr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"运算符重载\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.22,"words":366},"filePathRelative":"trait/ops.md","excerpt":"\\n<p>在 Rust 中，很多运算符可以通过 trait 来重载。也就是说，这些运算符可以根据它们的输入参数来完成不同的任务。这之所以可行，是因为运算符就是方法调用的语法糖。例如，<code>a + b</code> 中的 <code>+</code> 运算符会调用 <code>add</code> 方法（也就是 <code>a.add(b)</code>）。这个 <code>add</code> 方法是 <code>Add</code> trait 的一部分。因此，<code>+</code> 运算符可以被任何 <code>Add</code> trait 的实现者使用。</p>\\n<p>会重载运算符的 <code>trait</code>（比如 <code>Add</code> 这种）可以在<a href=\\"https://rustwiki.org/zh-CN/core/ops/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">这里</a>查看。</p>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"},{"title":"testcase_units","link":"generics/phantom/testcase_units.html"}],"localMap":{"nodes":[{"id":"trait/ops.md","value":{"title":"ops","path":"trait/ops.md","outlink":[],"backlink":["SUMMARY.md","generics/phantom/testcase_units.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}},{"id":"generics/phantom/testcase_units.md","value":{"title":"testcase_units","path":"generics/phantom/testcase_units.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"trait/ops.md"},{"source":"generics/phantom/testcase_units.md","target":"trait/ops.md"}]}}}');export{r as comp,o as data};
