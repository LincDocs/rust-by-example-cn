import{_ as p,e as i,k as l,f as s,g as o,i as a,h as t,r as d,o as r}from"./app-CY03Lsxp.js";const c={};function m(v,n){const e=d("RouteLink");return r(),i("div",null,[n[5]||(n[5]=l(`<h1 id="组合算子-map" tabindex="-1"><a class="header-anchor" href="#组合算子-map"><span>组合算子：<code>map</code></span></a></h1><p><code>match</code> 是处理 <code>Option</code> 的一个可用的方法，但你会发现大量使用它会很繁琐，特别是当操作只对一种输入是有效的时。这时，可以使用<a href="https://rustwiki.org/zh-CN/reference/glossary.html#%E7%BB%84%E5%90%88%E7%AE%97%E5%AD%90" target="_blank" rel="noopener noreferrer">组合算子</a>（combinator），以模块化的风格来管理控制流。</p><p><code>Option</code> 有一个内置方法 <code>map()</code>，这个组合算子可用于 <code>Some -&gt; Some</code> 和<br><code>None -&gt; None</code> 这样的简单映射。多个不同的 <code>map()</code> 调用可以串起来，这样更加灵活。</p><p>在下面例子中，<code>process()</code> 轻松取代了前面的所有函数，且更加紧凑。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#![allow(dead_code)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#[derive(Debug)] enum Food { Apple, Carrot, Potato }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#[derive(Debug)] struct Peeled(Food);</span></span>
<span class="line"><span>#[derive(Debug)] struct Chopped(Food);</span></span>
<span class="line"><span>#[derive(Debug)] struct Cooked(Food);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 削皮。如果没有食物，就返回 \`None\`。否则返回削好皮的食物。</span></span>
<span class="line"><span>fn peel(food: Option&lt;Food&gt;) -&gt; Option&lt;Peeled&gt; {</span></span>
<span class="line"><span>    match food {</span></span>
<span class="line"><span>        Some(food) =&gt; Some(Peeled(food)),</span></span>
<span class="line"><span>        None       =&gt; None,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 切食物。如果没有食物，就返回 \`None\`。否则返回切好的食物。</span></span>
<span class="line"><span>fn chop(peeled: Option&lt;Peeled&gt;) -&gt; Option&lt;Chopped&gt; {</span></span>
<span class="line"><span>    match peeled {</span></span>
<span class="line"><span>        Some(Peeled(food)) =&gt; Some(Chopped(food)),</span></span>
<span class="line"><span>        None               =&gt; None,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 烹饪食物。这里，我们使用 \`map()\` 来替代 \`match\` 以处理各种情况。</span></span>
<span class="line"><span>fn cook(chopped: Option&lt;Chopped&gt;) -&gt; Option&lt;Cooked&gt; {</span></span>
<span class="line"><span>    chopped.map(|Chopped(food)| Cooked(food))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 这个函数会完成削皮切块烹饪一条龙。我们把 \`map()\` 串起来，以简化代码。</span></span>
<span class="line"><span>fn process(food: Option&lt;Food&gt;) -&gt; Option&lt;Cooked&gt; {</span></span>
<span class="line"><span>    food.map(|f| Peeled(f))</span></span>
<span class="line"><span>        .map(|Peeled(f)| Chopped(f))</span></span>
<span class="line"><span>        .map(|Chopped(f)| Cooked(f))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 在尝试吃食物之前确认食物是否存在是非常重要的！</span></span>
<span class="line"><span>fn eat(food: Option&lt;Cooked&gt;) {</span></span>
<span class="line"><span>    match food {</span></span>
<span class="line"><span>        Some(food) =&gt; println!(&quot;Mmm. I love {:?}&quot;, food),</span></span>
<span class="line"><span>        None       =&gt; println!(&quot;Oh no! It wasn&#39;t edible.&quot;),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let apple = Some(Food::Apple);</span></span>
<span class="line"><span>    let carrot = Some(Food::Carrot);</span></span>
<span class="line"><span>    let potato = None;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let cooked_apple = cook(chop(peel(apple)));</span></span>
<span class="line"><span>    let cooked_carrot = cook(chop(peel(carrot)));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 现在让我们试试看起来更简单的 \`process()\`。</span></span>
<span class="line"><span>    let cooked_potato = process(potato);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    eat(cooked_apple);</span></span>
<span class="line"><span>    eat(cooked_carrot);</span></span>
<span class="line"><span>    eat(cooked_potato);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参见" tabindex="-1"><a class="header-anchor" href="#参见"><span>参见：</span></a></h3>`,6)),s("p",null,[o(e,{to:"/fn/closures.html"},{default:t(()=>n[0]||(n[0]=[a("闭包")])),_:1}),n[1]||(n[1]=a(", ")),n[2]||(n[2]=s("a",{href:"https://rustwiki.org/zh-CN/std/option/enum.Option.html",target:"_blank",rel:"noopener noreferrer"},[s("code",null,"Option")],-1)),n[3]||(n[3]=a(", 和 ")),n[4]||(n[4]=s("a",{href:"https://rustwiki.org/zh-CN/std/option/enum.Option.html#method.map",target:"_blank",rel:"noopener noreferrer"},[s("code",null,"Option::map()")],-1))])])}const b=p(c,[["render",m],["__file","map.html.vue"]]),h=JSON.parse('{"path":"/error/option_unwrap/map.html","title":"组合算子：map","lang":"zh-CN","frontmatter":{"description":"组合算子：map match 是处理 Option 的一个可用的方法，但你会发现大量使用它会很繁琐，特别是当操作只对一种输入是有效的时。这时，可以使用组合算子（combinator），以模块化的风格来管理控制流。 Option 有一个内置方法 map()，这个组合算子可用于 Some -> Some 和 None -> None 这样的简单映射。多个不...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn/error/option_unwrap/map.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn"}],["meta",{"property":"og:title","content":"组合算子：map"}],["meta",{"property":"og:description","content":"组合算子：map match 是处理 Option 的一个可用的方法，但你会发现大量使用它会很繁琐，特别是当操作只对一种输入是有效的时。这时，可以使用组合算子（combinator），以模块化的风格来管理控制流。 Option 有一个内置方法 map()，这个组合算子可用于 Some -> Some 和 None -> None 这样的简单映射。多个不..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"组合算子：map\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.55,"words":465},"filePathRelative":"error/option_unwrap/map.md","excerpt":"\\n<p><code>match</code> 是处理 <code>Option</code> 的一个可用的方法，但你会发现大量使用它会很繁琐，特别是当操作只对一种输入是有效的时。这时，可以使用<a href=\\"https://rustwiki.org/zh-CN/reference/glossary.html#%E7%BB%84%E5%90%88%E7%AE%97%E5%AD%90\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">组合算子</a>（combinator），以模块化的风格来管理控制流。</p>\\n<p><code>Option</code> 有一个内置方法 <code>map()</code>，这个组合算子可用于 <code>Some -&gt; Some</code> 和<br>\\n<code>None -&gt; None</code> 这样的简单映射。多个不同的 <code>map()</code> 调用可以串起来，这样更加灵活。</p>","autoDesc":true,"bioChainData":{"outlink":[{"title":"closures","link":"fn/closures.html"}],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"error/option_unwrap/map.md","value":{"title":"map","path":"error/option_unwrap/map.md","outlink":["fn/closures.md"],"backlink":["SUMMARY.md"]}},{"id":"fn/closures.md","value":{"title":"closures","path":"fn/closures.md","outlink":[],"backlink":[]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"error/option_unwrap/map.md","target":"fn/closures.md"},{"source":"SUMMARY.md","target":"error/option_unwrap/map.md"}]}}}');export{b as comp,h as data};
