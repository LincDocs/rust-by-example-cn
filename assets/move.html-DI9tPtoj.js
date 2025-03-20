import{_ as i,e as l,f as s,k as t,i as a,g as p,h as r,r as o,o as c}from"./app-CY03Lsxp.js";const d={};function u(m,n){const e=o("RouteLink");return c(),l("div",null,[n[5]||(n[5]=s("h1",{id:"所有权和移动",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#所有权和移动"},[s("span",null,"所有权和移动")])],-1)),s("p",null,[n[1]||(n[1]=a("因为变量要负责释放它们拥有的资源，所以")),n[2]||(n[2]=s("strong",null,"资源只能拥有一个所有者",-1)),n[3]||(n[3]=a("。这也防止了资源的重复释放。注意并非所有变量都拥有资源（例如")),p(e,{to:"/flow_control/match/destructuring/destructure_pointers.html"},{default:r(()=>n[0]||(n[0]=[a("引用")])),_:1}),n[4]||(n[4]=a("）。"))]),n[6]||(n[6]=t(`<p>在进行赋值（<code>let x = y</code>）或通过值来传递函数参数（<code>foo(x)</code>）的时候，资源的<strong>所有权</strong>（ownership）会发生转移。按照 Rust 的说法，这被称为资源的<strong>移动</strong>（move）。</p><p>在移动资源之后，原来的所有者不能再被使用，这可避免悬挂指针（dangling pointer）的产生。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 此函数取得堆分配的内存的所有权</span></span>
<span class="line"><span>fn destroy_box(c: Box&lt;i32&gt;) {</span></span>
<span class="line"><span>    println!(&quot;Destroying a box that contains {}&quot;, c);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // \`c\` 被销毁且内存得到释放</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    // 栈分配的整型</span></span>
<span class="line"><span>    let x = 5u32;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 将 \`x\` *复制*到 \`y\`——不存在资源移动</span></span>
<span class="line"><span>    let y = x;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 两个值各自都可以使用</span></span>
<span class="line"><span>    println!(&quot;x is {}, and y is {}&quot;, x, y);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // \`a\` 是一个指向堆分配的整数的指针</span></span>
<span class="line"><span>    let a = Box::new(5i32);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    println!(&quot;a contains: {}&quot;, a);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // *移动* \`a\` 到 \`b\`</span></span>
<span class="line"><span>    let b = a;</span></span>
<span class="line"><span>    // 把 \`a\` 的指针地址（而非数据）复制到 \`b\`。现在两者都指向</span></span>
<span class="line"><span>    // 同一个堆分配的数据，但是现在是 \`b\` 拥有它。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 报错！\`a\` 不能访问数据，因为它不再拥有那部分堆上的内存。</span></span>
<span class="line"><span>    //println!(&quot;a contains: {}&quot;, a);</span></span>
<span class="line"><span>    // 试一试 ^ 去掉此行注释</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 此函数从 \`b\` 中取得堆分配的内存的所有权</span></span>
<span class="line"><span>    destroy_box(b);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 此时堆内存已经被释放，这个操作会导致解引用已释放的内存，而这是编译器禁止的。</span></span>
<span class="line"><span>    // 报错！和前面出错的原因一样。</span></span>
<span class="line"><span>    //println!(&quot;b contains: {}&quot;, b);</span></span>
<span class="line"><span>    // 试一试 ^ 去掉此行注释</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3))])}const b=i(d,[["render",u],["__file","move.html.vue"]]),g=JSON.parse('{"path":"/scope/move.html","title":"所有权和移动","lang":"zh-CN","frontmatter":{"description":"所有权和移动 因为变量要负责释放它们拥有的资源，所以资源只能拥有一个所有者。这也防止了资源的重复释放。注意并非所有变量都拥有资源（例如）。 在进行赋值（let x = y）或通过值来传递函数参数（foo(x)）的时候，资源的所有权（ownership）会发生转移。按照 Rust 的说法，这被称为资源的移动（move）。 在移动资源之后，原来的所有者不能...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn/scope/move.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn"}],["meta",{"property":"og:title","content":"所有权和移动"}],["meta",{"property":"og:description","content":"所有权和移动 因为变量要负责释放它们拥有的资源，所以资源只能拥有一个所有者。这也防止了资源的重复释放。注意并非所有变量都拥有资源（例如）。 在进行赋值（let x = y）或通过值来传递函数参数（foo(x)）的时候，资源的所有权（ownership）会发生转移。按照 Rust 的说法，这被称为资源的移动（move）。 在移动资源之后，原来的所有者不能..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"所有权和移动\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.47,"words":440},"filePathRelative":"scope/move.md","excerpt":"\\n<p>因为变量要负责释放它们拥有的资源，所以<strong>资源只能拥有一个所有者</strong>。这也防止了资源的重复释放。注意并非所有变量都拥有资源（例如<a href=\\"/rust-by-example-cn/flow_control/match/destructuring/destructure_pointers.html\\" target=\\"_blank\\">引用</a>）。</p>\\n<p>在进行赋值（<code>let x = y</code>）或通过值来传递函数参数（<code>foo(x)</code>）的时候，资源的<strong>所有权</strong>（ownership）会发生转移。按照 Rust 的说法，这被称为资源的<strong>移动</strong>（move）。</p>","autoDesc":true,"bioChainData":{"outlink":[{"title":"destructure_pointers","link":"flow_control/match/destructuring/destructure_pointers.html"}],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"scope/move.md","value":{"title":"move","path":"scope/move.md","outlink":["flow_control/match/destructuring/destructure_pointers.md"],"backlink":["SUMMARY.md"]}},{"id":"flow_control/match/destructuring/destructure_pointers.md","value":{"title":"destructure_pointers","path":"flow_control/match/destructuring/destructure_pointers.md","outlink":[],"backlink":[]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"scope/move.md","target":"flow_control/match/destructuring/destructure_pointers.md"},{"source":"SUMMARY.md","target":"scope/move.md"}]}}}');export{b as comp,g as data};
