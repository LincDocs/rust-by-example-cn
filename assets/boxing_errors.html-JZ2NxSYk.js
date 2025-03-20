import{_ as s,e as a,k as e,o as i}from"./app-CVSWwIkE.js";const r={};function l(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="把错误-装箱" tabindex="-1"><a class="header-anchor" href="#把错误-装箱"><span>把错误 “装箱”</span></a></h1><p>如果又想写简单的代码，又想保存原始错误信息，一个方法是把它们<a href="https://rustwiki.org/zh-CN/std/boxed/struct.Box.html" target="_blank" rel="noopener noreferrer">装箱</a>（<code>Box</code>）。这样做的坏处就是，被包装的错误类型只能在运行时了解，而不能被<a href="https://rustwiki.org/zh-CN/book/ch17-02-trait-objects.html#trait-%E5%AF%B9%E8%B1%A1%E6%89%A7%E8%A1%8C%E5%8A%A8%E6%80%81%E5%88%86%E5%8F%91" target="_blank" rel="noopener noreferrer">静态地判别</a>。</p><p>对任何实现了 <code>Error</code> trait 的类型，标准库的 <code>Box</code> 通过 <a href="https://rustwiki.org/zh-CN/std/convert/trait.From.html" target="_blank" rel="noopener noreferrer"><code>From</code></a> 为它们提供了到 <code>Box&lt;Error&gt;</code> 的转换。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>use std::error;</span></span>
<span class="line"><span>use std::fmt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 为 \`Box&lt;error::Error&gt;\` 取别名。</span></span>
<span class="line"><span>type Result&lt;T&gt; = std::result::Result&lt;T, Box&lt;dyn error::Error&gt;&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#[derive(Debug, Clone)]</span></span>
<span class="line"><span>struct EmptyVec;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>impl fmt::Display for EmptyVec {</span></span>
<span class="line"><span>    fn fmt(&amp;self, f: &amp;mut fmt::Formatter) -&gt; fmt::Result {</span></span>
<span class="line"><span>        write!(f, &quot;invalid first item to double&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>impl error::Error for EmptyVec {</span></span>
<span class="line"><span>    fn description(&amp;self) -&gt; &amp;str {</span></span>
<span class="line"><span>        &quot;invalid first item to double&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn cause(&amp;self) -&gt; Option&lt;&amp;dyn error::Error&gt; {</span></span>
<span class="line"><span>        // 泛型错误。没有记录其内部原因。</span></span>
<span class="line"><span>        None</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn double_first(vec: Vec&lt;&amp;str&gt;) -&gt; Result&lt;i32&gt; {</span></span>
<span class="line"><span>    vec.first()</span></span>
<span class="line"><span>       .ok_or_else(|| EmptyVec.into())  // 装箱</span></span>
<span class="line"><span>       .and_then(|s| {</span></span>
<span class="line"><span>            s.parse::&lt;i32&gt;()</span></span>
<span class="line"><span>                .map_err(|e| e.into())  // 装箱</span></span>
<span class="line"><span>                .map(|i| 2 * i)</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn print(result: Result&lt;i32&gt;) {</span></span>
<span class="line"><span>    match result {</span></span>
<span class="line"><span>        Ok(n)  =&gt; println!(&quot;The first doubled is {}&quot;, n),</span></span>
<span class="line"><span>        Err(e) =&gt; println!(&quot;Error: {}&quot;, e),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let numbers = vec![&quot;42&quot;, &quot;93&quot;, &quot;18&quot;];</span></span>
<span class="line"><span>    let empty = vec![];</span></span>
<span class="line"><span>    let strings = vec![&quot;tofu&quot;, &quot;93&quot;, &quot;18&quot;];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print(double_first(numbers));</span></span>
<span class="line"><span>    print(double_first(empty));</span></span>
<span class="line"><span>    print(double_first(strings));</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参见" tabindex="-1"><a class="header-anchor" href="#参见"><span>参见：</span></a></h3><p><a href="https://rustwiki.org/zh-CN/book/ch17-02-trait-objects.html#trait-%E5%AF%B9%E8%B1%A1%E6%89%A7%E8%A1%8C%E5%8A%A8%E6%80%81%E5%88%86%E5%8F%91" target="_blank" rel="noopener noreferrer">动态分发</a> and <a href="https://rustwiki.org/zh-CN/std/error/trait.Error.html" target="_blank" rel="noopener noreferrer"><code>Error</code> trait</a></p>`,6)]))}const o=s(r,[["render",l],["__file","boxing_errors.html.vue"]]),c=JSON.parse('{"path":"/error/multiple_error_types/boxing_errors.html","title":"把错误 “装箱”","lang":"zh-CN","frontmatter":{"description":"把错误 “装箱” 如果又想写简单的代码，又想保存原始错误信息，一个方法是把它们装箱（Box）。这样做的坏处就是，被包装的错误类型只能在运行时了解，而不能被静态地判别。 对任何实现了 Error trait 的类型，标准库的 Box 通过 From 为它们提供了到 Box<Error> 的转换。 参见： 动态分发 and Error trait","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn-/error/multiple_error_types/boxing_errors.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn-"}],["meta",{"property":"og:title","content":"把错误 “装箱”"}],["meta",{"property":"og:description","content":"把错误 “装箱” 如果又想写简单的代码，又想保存原始错误信息，一个方法是把它们装箱（Box）。这样做的坏处就是，被包装的错误类型只能在运行时了解，而不能被静态地判别。 对任何实现了 Error trait 的类型，标准库的 Box 通过 From 为它们提供了到 Box<Error> 的转换。 参见： 动态分发 and Error trait"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"把错误 “装箱”\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn-/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.01,"words":304},"filePathRelative":"error/multiple_error_types/boxing_errors.md","excerpt":"\\n<p>如果又想写简单的代码，又想保存原始错误信息，一个方法是把它们<a href=\\"https://rustwiki.org/zh-CN/std/boxed/struct.Box.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">装箱</a>（<code>Box</code>）。这样做的坏处就是，被包装的错误类型只能在运行时了解，而不能被<a href=\\"https://rustwiki.org/zh-CN/book/ch17-02-trait-objects.html#trait-%E5%AF%B9%E8%B1%A1%E6%89%A7%E8%A1%8C%E5%8A%A8%E6%80%81%E5%88%86%E5%8F%91\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">静态地判别</a>。</p>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"error/multiple_error_types/boxing_errors.md","value":{"title":"boxing_errors","path":"error/multiple_error_types/boxing_errors.md","outlink":[],"backlink":["SUMMARY.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"error/multiple_error_types/boxing_errors.md"}]}}}');export{o as comp,c as data};
