import{_ as i,e as p,k as l,f as s,g as o,i as a,h as d,r as t,o as c}from"./app-CVSWwIkE.js";const r={};function m(u,n){const e=t("RouteLink");return c(),p("div",null,[n[5]||(n[5]=l(`<h1 id="组合算子-and-then" tabindex="-1"><a class="header-anchor" href="#组合算子-and-then"><span>组合算子：<code>and_then</code></span></a></h1><p><code>map()</code> 以链式调用的方式来简化 <code>match</code> 语句。然而，如果以返回类型是 <code>Option&lt;T&gt;</code><br> 的函数作为 <code>map()</code> 的参数，会导致出现嵌套形式 <code>Option&lt;Option&lt;T&gt;&gt;</code>。这样多层串联调用就会变得混乱。所以有必要引入 <code>and_then()</code>，在某些语言中它叫做 flatmap。</p><p><code>and_then()</code> 使用被 <code>Option</code> 包裹的值来调用其输入函数并返回结果。 如果 <code>Option</code><br> 是 <code>None</code>，那么它返回 <code>None</code>。</p><p>在下面例子中，<code>cookable_v2()</code> 会产生一个 <code>Option&lt;Food&gt;</code>。如果在这里使用 <code>map()</code><br> 而不是 <code>and_then()</code> 将会得到 <code>Option&lt;Option&lt;Food&gt;&gt;</code>，这对 <code>eat()</code> 来说是一个无效类型。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#![allow(dead_code)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#[derive(Debug)] enum Food { CordonBleu, Steak, Sushi }</span></span>
<span class="line"><span>#[derive(Debug)] enum Day { Monday, Tuesday, Wednesday }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 我们没有制作寿司所需的原材料（ingredient）（有其他的原材料）。</span></span>
<span class="line"><span>fn have_ingredients(food: Food) -&gt; Option&lt;Food&gt; {</span></span>
<span class="line"><span>    match food {</span></span>
<span class="line"><span>        Food::Sushi =&gt; None,</span></span>
<span class="line"><span>        _           =&gt; Some(food),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 我们拥有全部食物的食谱，除了法国蓝带猪排（Cordon Bleu）的。</span></span>
<span class="line"><span>fn have_recipe(food: Food) -&gt; Option&lt;Food&gt; {</span></span>
<span class="line"><span>    match food {</span></span>
<span class="line"><span>        Food::CordonBleu =&gt; None,</span></span>
<span class="line"><span>        _                =&gt; Some(food),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 要做一份好菜，我们需要原材料和食谱。</span></span>
<span class="line"><span>// 我们可以借助一系列 \`match\` 来表达这个逻辑：</span></span>
<span class="line"><span>fn cookable_v1(food: Food) -&gt; Option&lt;Food&gt; {</span></span>
<span class="line"><span>    match have_ingredients(food) {</span></span>
<span class="line"><span>        None       =&gt; None,</span></span>
<span class="line"><span>        Some(food) =&gt; match have_recipe(food) {</span></span>
<span class="line"><span>            None       =&gt; None,</span></span>
<span class="line"><span>            Some(food) =&gt; Some(food),</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 也可以使用 \`and_then()\` 把上面的逻辑改写得更紧凑：</span></span>
<span class="line"><span>fn cookable_v2(food: Food) -&gt; Option&lt;Food&gt; {</span></span>
<span class="line"><span>    have_ingredients(food).and_then(have_recipe)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn eat(food: Food, day: Day) {</span></span>
<span class="line"><span>    match cookable_v2(food) {</span></span>
<span class="line"><span>        Some(food) =&gt; println!(&quot;Yay! On {:?} we get to eat {:?}.&quot;, day, food),</span></span>
<span class="line"><span>        None       =&gt; println!(&quot;Oh no. We don&#39;t get to eat on {:?}?&quot;, day),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let (cordon_bleu, steak, sushi) = (Food::CordonBleu, Food::Steak, Food::Sushi);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    eat(cordon_bleu, Day::Monday);</span></span>
<span class="line"><span>    eat(steak, Day::Tuesday);</span></span>
<span class="line"><span>    eat(sushi, Day::Wednesday);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参见" tabindex="-1"><a class="header-anchor" href="#参见"><span>参见：</span></a></h3>`,6)),s("p",null,[o(e,{to:"/fn/closures.html"},{default:d(()=>n[0]||(n[0]=[a("闭包")])),_:1}),n[1]||(n[1]=a("，")),n[2]||(n[2]=s("a",{href:"https://rustwiki.org/zh-CN/std/option/enum.Option.html#method.map",target:"_blank",rel:"noopener noreferrer"},[s("code",null,"Option::map()")],-1)),n[3]||(n[3]=a(", 和 ")),n[4]||(n[4]=s("a",{href:"https://rustwiki.org/zh-CN/std/option/enum.Option.html#method.and_then",target:"_blank",rel:"noopener noreferrer"},[s("code",null,"Option::and_then()")],-1))])])}const h=i(r,[["render",m],["__file","and_then.html.vue"]]),b=JSON.parse('{"path":"/error/option_unwrap/and_then.html","title":"组合算子：and_then","lang":"zh-CN","frontmatter":{"description":"组合算子：and_then map() 以链式调用的方式来简化 match 语句。然而，如果以返回类型是 Option<T> 的函数作为 map() 的参数，会导致出现嵌套形式 Option<Option<T>>。这样多层串联调用就会变得混乱。所以有必要引入 and_then()，在某些语言中它叫做 flatmap。 and_then() 使用被 Op...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn-/error/option_unwrap/and_then.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn-"}],["meta",{"property":"og:title","content":"组合算子：and_then"}],["meta",{"property":"og:description","content":"组合算子：and_then map() 以链式调用的方式来简化 match 语句。然而，如果以返回类型是 Option<T> 的函数作为 map() 的参数，会导致出现嵌套形式 Option<Option<T>>。这样多层串联调用就会变得混乱。所以有必要引入 and_then()，在某些语言中它叫做 flatmap。 and_then() 使用被 Op..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"组合算子：and_then\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn-/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.41,"words":422},"filePathRelative":"error/option_unwrap/and_then.md","excerpt":"\\n<p><code>map()</code> 以链式调用的方式来简化 <code>match</code> 语句。然而，如果以返回类型是 <code>Option&lt;T&gt;</code><br>\\n的函数作为 <code>map()</code> 的参数，会导致出现嵌套形式 <code>Option&lt;Option&lt;T&gt;&gt;</code>。这样多层串联调用就会变得混乱。所以有必要引入 <code>and_then()</code>，在某些语言中它叫做 flatmap。</p>\\n<p><code>and_then()</code> 使用被 <code>Option</code> 包裹的值来调用其输入函数并返回结果。 如果 <code>Option</code><br>\\n是 <code>None</code>，那么它返回 <code>None</code>。</p>","autoDesc":true,"bioChainData":{"outlink":[{"title":"closures","link":"fn/closures.html"}],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"error/option_unwrap/and_then.md","value":{"title":"and_then","path":"error/option_unwrap/and_then.md","outlink":["fn/closures.md"],"backlink":["SUMMARY.md"]}},{"id":"fn/closures.md","value":{"title":"closures","path":"fn/closures.md","outlink":[],"backlink":[]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"error/option_unwrap/and_then.md","target":"fn/closures.md"},{"source":"SUMMARY.md","target":"error/option_unwrap/and_then.md"}]}}}');export{h as comp,b as data};
