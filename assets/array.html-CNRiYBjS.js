import{_ as s,e as a,k as e,o as i}from"./app-CY03Lsxp.js";const l={};function t(p,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="数组和切片" tabindex="-1"><a class="header-anchor" href="#数组和切片"><span>数组和切片</span></a></h1><p>数组（array）是一组拥有相同类型 <code>T</code> 的对象的集合，在内存中是连续存储的。数组使用中括号 <code>[]</code> 来创建，且它们的大小在编译时会被确定。数组的类型标记为 <code>[T; length]</code>（译注：<code>T</code> 为元素类型，<code>length</code> 表示数组大小）。</p><p>切片（slice）类型和数组类似，但其大小在编译时是不确定的。相反，切片是一个双字对象（two-word object），第一个字是一个指向数据的指针，第二个字是切片的长度。这个 “字” 的宽度和 usize 相同，由处理器架构决定，比如在 x86-64 平台上就是 64 位。slice 可以用来借用数组的一部分。slice 的类型标记为 <code>&amp;[T]</code>。</p><div class="language-rust,editable,ignore,mdbook-runnable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable,ignore,mdbook-runnable" data-title="rust,editable,ignore,mdbook-runnable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>use std::mem;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 此函数借用一个 slice</span></span>
<span class="line"><span>fn analyze_slice(slice: &amp;[i32]) {</span></span>
<span class="line"><span>    println!(&quot;first element of the slice: {}&quot;, slice[0]);</span></span>
<span class="line"><span>    println!(&quot;the slice has {} elements&quot;, slice.len());</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    // 定长数组（类型标记是多余的）</span></span>
<span class="line"><span>    let xs: [i32; 5] = [1, 2, 3, 4, 5];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 所有元素可以初始化成相同的值</span></span>
<span class="line"><span>    let ys: [i32; 500] = [0; 500];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 下标从 0 开始</span></span>
<span class="line"><span>    println!(&quot;first element of the array: {}&quot;, xs[0]);</span></span>
<span class="line"><span>    println!(&quot;second element of the array: {}&quot;, xs[1]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // \`len\` 返回数组的大小</span></span>
<span class="line"><span>    println!(&quot;array size: {}&quot;, xs.len());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 数组是在栈中分配的</span></span>
<span class="line"><span>    println!(&quot;array occupies {} bytes&quot;, mem::size_of_val(&amp;xs));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 数组可以自动被借用成为 slice</span></span>
<span class="line"><span>    println!(&quot;borrow the whole array as a slice&quot;);</span></span>
<span class="line"><span>    analyze_slice(&amp;xs);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // slice 可以指向数组的一部分</span></span>
<span class="line"><span>    println!(&quot;borrow a section of the array as a slice&quot;);</span></span>
<span class="line"><span>    analyze_slice(&amp;ys[1 .. 4]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 越界的下标会引发致命错误（panic）</span></span>
<span class="line"><span>    println!(&quot;{}&quot;, xs[5]);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)]))}const r=s(l,[["render",t],["__file","array.html.vue"]]),d=JSON.parse('{"path":"/primitives/array.html","title":"数组和切片","lang":"zh-CN","frontmatter":{"description":"数组和切片 数组（array）是一组拥有相同类型 T 的对象的集合，在内存中是连续存储的。数组使用中括号 [] 来创建，且它们的大小在编译时会被确定。数组的类型标记为 [T; length]（译注：T 为元素类型，length 表示数组大小）。 切片（slice）类型和数组类似，但其大小在编译时是不确定的。相反，切片是一个双字对象（two-word o...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn/primitives/array.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn"}],["meta",{"property":"og:title","content":"数组和切片"}],["meta",{"property":"og:description","content":"数组和切片 数组（array）是一组拥有相同类型 T 的对象的集合，在内存中是连续存储的。数组使用中括号 [] 来创建，且它们的大小在编译时会被确定。数组的类型标记为 [T; length]（译注：T 为元素类型，length 表示数组大小）。 切片（slice）类型和数组类似，但其大小在编译时是不确定的。相反，切片是一个双字对象（two-word o..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数组和切片\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.32,"words":395},"filePathRelative":"primitives/array.md","excerpt":"\\n<p>数组（array）是一组拥有相同类型 <code>T</code> 的对象的集合，在内存中是连续存储的。数组使用中括号 <code>[]</code> 来创建，且它们的大小在编译时会被确定。数组的类型标记为 <code>[T; length]</code>（译注：<code>T</code> 为元素类型，<code>length</code> 表示数组大小）。</p>\\n<p>切片（slice）类型和数组类似，但其大小在编译时是不确定的。相反，切片是一个双字对象（two-word object），第一个字是一个指向数据的指针，第二个字是切片的长度。这个 “字” 的宽度和 usize 相同，由处理器架构决定，比如在 x86-64 平台上就是 64 位。slice 可以用来借用数组的一部分。slice 的类型标记为 <code>&amp;[T]</code>。</p>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"},{"title":"destructure_slice","link":"flow_control/match/destructuring/destructure_slice.html"}],"localMap":{"nodes":[{"id":"primitives/array.md","value":{"title":"array","path":"primitives/array.md","outlink":[],"backlink":["SUMMARY.md","flow_control/match/destructuring/destructure_slice.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}},{"id":"flow_control/match/destructuring/destructure_slice.md","value":{"title":"destructure_slice","path":"flow_control/match/destructuring/destructure_slice.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"primitives/array.md"},{"source":"flow_control/match/destructuring/destructure_slice.md","target":"primitives/array.md"}]}}}');export{r as comp,d as data};
