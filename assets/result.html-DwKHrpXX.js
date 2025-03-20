import{_ as n,e as a,k as e,o as l}from"./app-CY03Lsxp.js";const i={};function p(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="结果-result" tabindex="-1"><a class="header-anchor" href="#结果-result"><span>结果 <code>Result</code></span></a></h1><p>我们已经看到 <code>Option</code> 枚举类型可以用作可能失败的函数的返回值，其中返回 <code>None</code> 可以表明失败。但是有时要强调<strong>为什么</strong>一个操作会失败。为做到这点，我们提供了 <code>Result</code> 枚举类型。</p><p><code>Result&lt;T, E&gt;</code> 类型拥有两个取值：</p><ul><li><code>Ok(value)</code> 表示操作成功，并包装操作返回的 <code>value</code>（<code>value</code> 拥有 <code>T</code> 类型）。</li><li><code>Err(why)</code>，表示操作失败，并包装 <code>why</code>，它（但愿）能够解释失败的原因（<code>why</code> 拥有 <code>E</code> 类型）。</li></ul><div class="language-rust,editalbe,ignore,mdbook-runnable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editalbe,ignore,mdbook-runnable" data-title="rust,editalbe,ignore,mdbook-runnable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>mod checked {</span></span>
<span class="line"><span>    // 我们想要捕获的数学 “错误”</span></span>
<span class="line"><span>    #[derive(Debug)]</span></span>
<span class="line"><span>    pub enum MathError {</span></span>
<span class="line"><span>        DivisionByZero,</span></span>
<span class="line"><span>        NegativeLogarithm,</span></span>
<span class="line"><span>        NegativeSquareRoot,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    pub type MathResult = Result&lt;f64, MathError&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    pub fn div(x: f64, y: f64) -&gt; MathResult {</span></span>
<span class="line"><span>        if y == 0.0 {</span></span>
<span class="line"><span>            // 此操作将会失败，那么（与其让程序崩溃）不如把失败的原因包装在</span></span>
<span class="line"><span>            // \`Err\` 中并返回</span></span>
<span class="line"><span>            Err(MathError::DivisionByZero)</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            // 此操作是有效的，返回包装在 \`Ok\` 中的结果</span></span>
<span class="line"><span>            Ok(x / y)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    pub fn sqrt(x: f64) -&gt; MathResult {</span></span>
<span class="line"><span>        if x &lt; 0.0 {</span></span>
<span class="line"><span>            Err(MathError::NegativeSquareRoot)</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            Ok(x.sqrt())</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    pub fn ln(x: f64) -&gt; MathResult {</span></span>
<span class="line"><span>        if x &lt; 0.0 {</span></span>
<span class="line"><span>            Err(MathError::NegativeLogarithm)</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            Ok(x.ln())</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// \`op(x, y)\` === \`sqrt(ln(x / y))\`</span></span>
<span class="line"><span>fn op(x: f64, y: f64) -&gt; f64 {</span></span>
<span class="line"><span>    // 这是一个三层的 match 金字塔！</span></span>
<span class="line"><span>    match checked::div(x, y) {</span></span>
<span class="line"><span>        Err(why) =&gt; panic!(&quot;{:?}&quot;, why),</span></span>
<span class="line"><span>        Ok(ratio) =&gt; match checked::ln(ratio) {</span></span>
<span class="line"><span>            Err(why) =&gt; panic!(&quot;{:?}&quot;, why),</span></span>
<span class="line"><span>            Ok(ln) =&gt; match checked::sqrt(ln) {</span></span>
<span class="line"><span>                Err(why) =&gt; panic!(&quot;{:?}&quot;, why),</span></span>
<span class="line"><span>                Ok(sqrt) =&gt; sqrt,</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    // 这会失败吗？</span></span>
<span class="line"><span>    println!(&quot;{}&quot;, op(1.0, 10.0));</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)]))}const d=n(i,[["render",p],["__file","result.html.vue"]]),r=JSON.parse('{"path":"/std/result.html","title":"结果 Result","lang":"zh-CN","frontmatter":{"description":"结果 Result 我们已经看到 Option 枚举类型可以用作可能失败的函数的返回值，其中返回 None 可以表明失败。但是有时要强调为什么一个操作会失败。为做到这点，我们提供了 Result 枚举类型。 Result<T, E> 类型拥有两个取值： Ok(value) 表示操作成功，并包装操作返回的 value（value 拥有 T 类型）。 Er...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn/std/result.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn"}],["meta",{"property":"og:title","content":"结果 Result"}],["meta",{"property":"og:description","content":"结果 Result 我们已经看到 Option 枚举类型可以用作可能失败的函数的返回值，其中返回 None 可以表明失败。但是有时要强调为什么一个操作会失败。为做到这点，我们提供了 Result 枚举类型。 Result<T, E> 类型拥有两个取值： Ok(value) 表示操作成功，并包装操作返回的 value（value 拥有 T 类型）。 Er..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"结果 Result\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.14,"words":342},"filePathRelative":"std/result.md","excerpt":"\\n<p>我们已经看到 <code>Option</code> 枚举类型可以用作可能失败的函数的返回值，其中返回 <code>None</code> 可以表明失败。但是有时要强调<strong>为什么</strong>一个操作会失败。为做到这点，我们提供了 <code>Result</code> 枚举类型。</p>\\n<p><code>Result&lt;T, E&gt;</code> 类型拥有两个取值：</p>\\n<ul>\\n<li><code>Ok(value)</code> 表示操作成功，并包装操作返回的 <code>value</code>（<code>value</code> 拥有 <code>T</code> 类型）。</li>\\n<li><code>Err(why)</code>，表示操作失败，并包装 <code>why</code>，它（但愿）能够解释失败的原因（<code>why</code> 拥有 <code>E</code> 类型）。</li>\\n</ul>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"},{"title":"testcase_list","link":"hello/print/print_display/testcase_list.html"}],"localMap":{"nodes":[{"id":"std/result.md","value":{"title":"result","path":"std/result.md","outlink":[],"backlink":["SUMMARY.md","hello/print/print_display/testcase_list.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}},{"id":"hello/print/print_display/testcase_list.md","value":{"title":"testcase_list","path":"hello/print/print_display/testcase_list.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"std/result.md"},{"source":"hello/print/print_display/testcase_list.md","target":"std/result.md"}]}}}');export{d as comp,r as data};
