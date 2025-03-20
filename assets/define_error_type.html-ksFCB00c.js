import{_ as s,e,k as a,o as i}from"./app-CVSWwIkE.js";const l={};function p(r,n){return i(),e("div",null,n[0]||(n[0]=[a(`<h1 id="定义一个错误类型" tabindex="-1"><a class="header-anchor" href="#定义一个错误类型"><span>定义一个错误类型</span></a></h1><p>有时候把所有不同的错误都视为一种错误类型会简化代码。我们将用一个自定义错误类型来演示这一点。</p><p>Rust 允许我们定义自己的错误类型。一般来说，一个 “好的” 错误类型应当：</p><ul><li>用同一个类型代表了多种错误</li><li>向用户提供了清楚的错误信息</li><li>能够容易地与其他类型比较 <ul><li>好的例子：<code>Err(EmptyVec)</code></li><li>坏的例子：<code>Err(&quot;Please use a vector with at least one element&quot;.to_owned())</code></li></ul></li><li>能够容纳错误的具体信息 <ul><li>好的例子：<code>Err(BadChar(c, position))</code></li><li>坏的例子：<code>Err(&quot;+ cannot be used here&quot;.to_owned())</code></li></ul></li><li>能够与其他错误很好地整合</li></ul><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>use std::error;</span></span>
<span class="line"><span>use std::fmt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Result&lt;T&gt; = std::result::Result&lt;T, DoubleError&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#[derive(Debug, Clone)]</span></span>
<span class="line"><span>// 定义我们的错误类型，这种类型可以根据错误处理的实际情况定制。</span></span>
<span class="line"><span>// 我们可以完全自定义错误类型，也可以在类型中完全采用底层的错误实现，</span></span>
<span class="line"><span>// 也可以介于二者之间。</span></span>
<span class="line"><span>struct DoubleError;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 错误的生成与它如何显示是完全没关系的。没有必要担心复杂的逻辑会导致混乱的显示。</span></span>
<span class="line"><span>//</span></span>
<span class="line"><span>// 注意我们没有储存关于错误的任何额外信息，也就是说，如果不修改我们的错误类型定义的话，</span></span>
<span class="line"><span>// 就无法指明是哪个字符串解析失败了。</span></span>
<span class="line"><span>impl fmt::Display for DoubleError {</span></span>
<span class="line"><span>    fn fmt(&amp;self, f: &amp;mut fmt::Formatter) -&gt; fmt::Result {</span></span>
<span class="line"><span>        write!(f, &quot;invalid first item to double&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 为 \`DoubleError\` 实现 \`Error\` trait，这样其他错误可以包裹这个错误类型。</span></span>
<span class="line"><span>impl error::Error for DoubleError {</span></span>
<span class="line"><span>    fn source(&amp;self) -&gt; Option&lt;&amp;(dyn error::Error + &#39;static)&gt; {</span></span>
<span class="line"><span>        // 泛型错误，没有记录其内部原因。</span></span>
<span class="line"><span>        None</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn double_first(vec: Vec&lt;&amp;str&gt;) -&gt; Result&lt;i32&gt; {</span></span>
<span class="line"><span>    vec.first()</span></span>
<span class="line"><span>       // 把错误换成我们的新类型。</span></span>
<span class="line"><span>       .ok_or(DoubleError)</span></span>
<span class="line"><span>       .and_then(|s| {</span></span>
<span class="line"><span>            s.parse::&lt;i32&gt;()</span></span>
<span class="line"><span>                // 这里也换成新类型。</span></span>
<span class="line"><span>                .map_err(|_| DoubleError)</span></span>
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
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)]))}const d=s(l,[["render",p],["__file","define_error_type.html.vue"]]),c=JSON.parse('{"path":"/error/multiple_error_types/define_error_type.html","title":"定义一个错误类型","lang":"zh-CN","frontmatter":{"description":"定义一个错误类型 有时候把所有不同的错误都视为一种错误类型会简化代码。我们将用一个自定义错误类型来演示这一点。 Rust 允许我们定义自己的错误类型。一般来说，一个 “好的” 错误类型应当： 用同一个类型代表了多种错误 向用户提供了清楚的错误信息 能够容易地与其他类型比较 好的例子：Err(EmptyVec) 坏的例子：Err(\\"Please use ...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn-/error/multiple_error_types/define_error_type.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn-"}],["meta",{"property":"og:title","content":"定义一个错误类型"}],["meta",{"property":"og:description","content":"定义一个错误类型 有时候把所有不同的错误都视为一种错误类型会简化代码。我们将用一个自定义错误类型来演示这一点。 Rust 允许我们定义自己的错误类型。一般来说，一个 “好的” 错误类型应当： 用同一个类型代表了多种错误 向用户提供了清楚的错误信息 能够容易地与其他类型比较 好的例子：Err(EmptyVec) 坏的例子：Err(\\"Please use ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"定义一个错误类型\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn-/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.76,"words":528},"filePathRelative":"error/multiple_error_types/define_error_type.md","excerpt":"\\n<p>有时候把所有不同的错误都视为一种错误类型会简化代码。我们将用一个自定义错误类型来演示这一点。</p>\\n<p>Rust 允许我们定义自己的错误类型。一般来说，一个 “好的” 错误类型应当：</p>\\n<ul>\\n<li>用同一个类型代表了多种错误</li>\\n<li>向用户提供了清楚的错误信息</li>\\n<li>能够容易地与其他类型比较\\n<ul>\\n<li>好的例子：<code>Err(EmptyVec)</code></li>\\n<li>坏的例子：<code>Err(\\"Please use a vector with at least one element\\".to_owned())</code></li>\\n</ul>\\n</li>\\n<li>能够容纳错误的具体信息\\n<ul>\\n<li>好的例子：<code>Err(BadChar(c, position))</code></li>\\n<li>坏的例子：<code>Err(\\"+ cannot be used here\\".to_owned())</code></li>\\n</ul>\\n</li>\\n<li>能够与其他错误很好地整合</li>\\n</ul>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"error/multiple_error_types/define_error_type.md","value":{"title":"define_error_type","path":"error/multiple_error_types/define_error_type.md","outlink":[],"backlink":["SUMMARY.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"error/multiple_error_types/define_error_type.md"}]}}}');export{d as comp,c as data};
