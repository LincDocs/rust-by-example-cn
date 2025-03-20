import{_ as p,e as t,f as s,k as c,i as a,g as e,h as l,r as d,o as m}from"./app-CY03Lsxp.js";const r={};function o(u,n){const i=d("RouteLink");return m(),t("div",null,[n[4]||(n[4]=s("h1",{id:"函数",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#函数"},[s("span",null,"函数")])],-1)),s("p",null,[n[1]||(n[1]=a("排除")),e(i,{to:"/scope/lifetime/elision.html"},{default:l(()=>n[0]||(n[0]=[a("省略")])),_:1}),n[2]||(n[2]=a("（elision）的情况，带上生命周期的函数签名有一些限制："))]),n[5]||(n[5]=c(`<ul><li>任何引用<strong>都必须</strong>拥有标注好的生命周期。</li><li>任何被返回的引用<strong>都必须</strong>有和某个输入量相同的生命周期或是静态类型（<code>static</code>）。</li></ul><p>另外要注意，如果没有输入的函数返回引用，有时会导致返回的引用指向无效数据，这种情况下禁止它返回这样的引用。下面例子展示了一些合法的带有生命周期的函数：</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 一个拥有生命周期 \`&#39;a\` 的输入引用，其中 \`&#39;a\` 的存活时间</span></span>
<span class="line"><span>// 至少与函数的一样长。</span></span>
<span class="line"><span>fn print_one&lt;&#39;a&gt;(x: &amp;&#39;a i32) {</span></span>
<span class="line"><span>    println!(&quot;\`print_one\`: x is {}&quot;, x);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 可变引用同样也可能拥有生命周期。</span></span>
<span class="line"><span>fn add_one&lt;&#39;a&gt;(x: &amp;&#39;a mut i32) {</span></span>
<span class="line"><span>    *x += 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 拥有不同生命周期的多个元素。对下面这种情形，两者即使拥有</span></span>
<span class="line"><span>// 相同的生命周期 \`&#39;a\` 也没问题，但对一些更复杂的情形，可能</span></span>
<span class="line"><span>// 就需要不同的生命周期了。</span></span>
<span class="line"><span>fn print_multi&lt;&#39;a, &#39;b&gt;(x: &amp;&#39;a i32, y: &amp;&#39;b i32) {</span></span>
<span class="line"><span>    println!(&quot;\`print_multi\`: x is {}, y is {}&quot;, x, y);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 返回传递进来的引用也是可行的。</span></span>
<span class="line"><span>// 但必须返回正确的生命周期。</span></span>
<span class="line"><span>fn pass_x&lt;&#39;a, &#39;b&gt;(x: &amp;&#39;a i32, _: &amp;&#39;b i32) -&gt; &amp;&#39;a i32 { x }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//fn invalid_output&lt;&#39;a&gt;() -&gt; &amp;&#39;a String { &amp;String::from(&quot;foo&quot;) }</span></span>
<span class="line"><span>// 上面代码是无效的：\`&#39;a\` 存活的时间必须比函数的长。</span></span>
<span class="line"><span>// 这里的 \`&amp;String::from(&quot;foo&quot;)\` 将会创建一个 \`String\` 类型，然后对它取引用。</span></span>
<span class="line"><span>// 数据在离开作用域时删掉，返回一个指向无效数据的引用。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let x = 7;</span></span>
<span class="line"><span>    let y = 9;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print_one(&amp;x);</span></span>
<span class="line"><span>    print_multi(&amp;x, &amp;y);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let z = pass_x(&amp;x, &amp;y);</span></span>
<span class="line"><span>    print_one(z);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let mut t = 3;</span></span>
<span class="line"><span>    add_one(&amp;mut t);</span></span>
<span class="line"><span>    print_one(&amp;t);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参见" tabindex="-1"><a class="header-anchor" href="#参见"><span>参见：</span></a></h3>`,4)),s("p",null,[e(i,{to:"/scope/lifetime/fn.html"},{default:l(()=>n[3]||(n[3]=[a("函数")])),_:1})])])}const b=p(r,[["render",o],["__file","fn.html.vue"]]),f=JSON.parse('{"path":"/scope/lifetime/fn.html","title":"函数","lang":"zh-CN","frontmatter":{"description":"函数 排除（elision）的情况，带上生命周期的函数签名有一些限制： 任何引用都必须拥有标注好的生命周期。 任何被返回的引用都必须有和某个输入量相同的生命周期或是静态类型（static）。 另外要注意，如果没有输入的函数返回引用，有时会导致返回的引用指向无效数据，这种情况下禁止它返回这样的引用。下面例子展示了一些合法的带有生命周期的函数： 参见：","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn/scope/lifetime/fn.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn"}],["meta",{"property":"og:title","content":"函数"}],["meta",{"property":"og:description","content":"函数 排除（elision）的情况，带上生命周期的函数签名有一些限制： 任何引用都必须拥有标注好的生命周期。 任何被返回的引用都必须有和某个输入量相同的生命周期或是静态类型（static）。 另外要注意，如果没有输入的函数返回引用，有时会导致返回的引用指向无效数据，这种情况下禁止它返回这样的引用。下面例子展示了一些合法的带有生命周期的函数： 参见："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.52,"words":456},"filePathRelative":"scope/lifetime/fn.md","excerpt":"\\n<p>排除<a href=\\"/rust-by-example-cn/scope/lifetime/elision.html\\" target=\\"_blank\\">省略</a>（elision）的情况，带上生命周期的函数签名有一些限制：</p>\\n<ul>\\n<li>任何引用<strong>都必须</strong>拥有标注好的生命周期。</li>\\n<li>任何被返回的引用<strong>都必须</strong>有和某个输入量相同的生命周期或是静态类型（<code>static</code>）。</li>\\n</ul>\\n<p>另外要注意，如果没有输入的函数返回引用，有时会导致返回的引用指向无效数据，这种情况下禁止它返回这样的引用。下面例子展示了一些合法的带有生命周期的函数：</p>","autoDesc":true,"bioChainData":{"outlink":[{"title":"elision","link":"scope/lifetime/elision.html"},{"title":"fn","link":"scope/lifetime/fn.html"}],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"},{"title":"impl","link":"generics/impl.html"},{"title":"fn","link":"scope/lifetime/fn.html"}],"localMap":{"nodes":[{"id":"scope/lifetime/fn.md","value":{"title":"fn","path":"scope/lifetime/fn.md","outlink":["scope/lifetime/elision.md"],"backlink":["SUMMARY.md","generics/impl.md"]}},{"id":"scope/lifetime/elision.md","value":{"title":"elision","path":"scope/lifetime/elision.md","outlink":[],"backlink":[]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}},{"id":"generics/impl.md","value":{"title":"impl","path":"generics/impl.md","outlink":[],"backlink":[]}}],"links":[{"source":"scope/lifetime/fn.md","target":"scope/lifetime/elision.md"},{"source":"SUMMARY.md","target":"scope/lifetime/fn.md"},{"source":"generics/impl.md","target":"scope/lifetime/fn.md"}]}}}');export{b as comp,f as data};
