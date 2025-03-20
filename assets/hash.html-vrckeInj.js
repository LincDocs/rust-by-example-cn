import{_ as s,e as n,k as e,o as i}from"./app-CVSWwIkE.js";const p={};function l(t,a){return i(),n("div",null,a[0]||(a[0]=[e(`<h1 id="散列表-hashmap" tabindex="-1"><a class="header-anchor" href="#散列表-hashmap"><span>散列表 HashMap</span></a></h1><p>vector 通过整型下标来存储值，而 <code>HashMap</code>（散列表）通过键（key）来存储值。<code>HashMap</code> 的键可以是布尔型、整型、字符串，或任意实现了 <code>Eq</code> 和 <code>Hash</code> trait 的其他类型。在下一节将进一步介绍。</p><p>和 vector 类似，<code>HashMap</code> 也是可增长的，但 HashMap 在占据了多余空间时还可以缩小自己。可以使用 <code>HashMap::with_capacity(unit)</code> 创建具有一定初始容量的 HashMap，也可以使用 <code>HashMap::new()</code> 来获得一个带有默认初始容量的 HashMap（这是推荐方式）。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>use std::collections::HashMap;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn call(number: &amp;str) -&gt; &amp;str {</span></span>
<span class="line"><span>    match number {</span></span>
<span class="line"><span>        &quot;798-1364&quot; =&gt; &quot;We&#39;re sorry, the call cannot be completed as dialed. </span></span>
<span class="line"><span>            Please hang up and try again.&quot;,</span></span>
<span class="line"><span>        &quot;645-7689&quot; =&gt; &quot;Hello, this is Mr. Awesome&#39;s Pizza. My name is Fred.</span></span>
<span class="line"><span>            What can I get for you today?&quot;,</span></span>
<span class="line"><span>        _ =&gt; &quot;Hi! Who is this again?&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() { </span></span>
<span class="line"><span>    let mut contacts = HashMap::new();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    contacts.insert(&quot;Daniel&quot;, &quot;798-1364&quot;);</span></span>
<span class="line"><span>    contacts.insert(&quot;Ashley&quot;, &quot;645-7689&quot;);</span></span>
<span class="line"><span>    contacts.insert(&quot;Katie&quot;, &quot;435-8291&quot;);</span></span>
<span class="line"><span>    contacts.insert(&quot;Robert&quot;, &quot;956-1745&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 接受一个引用并返回 Option&lt;&amp;V&gt;</span></span>
<span class="line"><span>    match contacts.get(&amp;&quot;Daniel&quot;) {</span></span>
<span class="line"><span>        Some(&amp;number) =&gt; println!(&quot;Calling Daniel: {}&quot;, call(number)),</span></span>
<span class="line"><span>        _ =&gt; println!(&quot;Don&#39;t have Daniel&#39;s number.&quot;),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果被插入的值为新内容，那么 \`HashMap::insert()\` 返回 \`None\`，</span></span>
<span class="line"><span>    // 否则返回 \`Some(value)\`</span></span>
<span class="line"><span>    contacts.insert(&quot;Daniel&quot;, &quot;164-6743&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    match contacts.get(&amp;&quot;Ashley&quot;) {</span></span>
<span class="line"><span>        Some(&amp;number) =&gt; println!(&quot;Calling Ashley: {}&quot;, call(number)),</span></span>
<span class="line"><span>        _ =&gt; println!(&quot;Don&#39;t have Ashley&#39;s number.&quot;),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    contacts.remove(&amp;(&quot;Ashley&quot;)); </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // \`HashMap::iter()\` 返回一个迭代器，该迭代器以任意顺序举出</span></span>
<span class="line"><span>    // (&amp;&#39;a key, &amp;&#39;a value) 对。</span></span>
<span class="line"><span>    for (contact, &amp;number) in contacts.iter() {</span></span>
<span class="line"><span>        println!(&quot;Calling {}: {}&quot;, contact, call(number)); </span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>想要了解更多关于散列（hash）与散列表（hash map）（有时也称作 hash table）的工作原理，可以查看 Wikipedia 的<a href="https://en.wikipedia.org/wiki/Hash_table" target="_blank" rel="noopener noreferrer">散列表</a>词条。</p>`,5)]))}const o=s(p,[["render",l],["__file","hash.html.vue"]]),d=JSON.parse('{"path":"/std/hash.html","title":"散列表 HashMap","lang":"zh-CN","frontmatter":{"description":"散列表 HashMap vector 通过整型下标来存储值，而 HashMap（散列表）通过键（key）来存储值。HashMap 的键可以是布尔型、整型、字符串，或任意实现了 Eq 和 Hash trait 的其他类型。在下一节将进一步介绍。 和 vector 类似，HashMap 也是可增长的，但 HashMap 在占据了多余空间时还可以缩小自己。可...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn-/std/hash.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn-"}],["meta",{"property":"og:title","content":"散列表 HashMap"}],["meta",{"property":"og:description","content":"散列表 HashMap vector 通过整型下标来存储值，而 HashMap（散列表）通过键（key）来存储值。HashMap 的键可以是布尔型、整型、字符串，或任意实现了 Eq 和 Hash trait 的其他类型。在下一节将进一步介绍。 和 vector 类似，HashMap 也是可增长的，但 HashMap 在占据了多余空间时还可以缩小自己。可..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"散列表 HashMap\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn-/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.29,"words":386},"filePathRelative":"std/hash.md","excerpt":"\\n<p>vector 通过整型下标来存储值，而 <code>HashMap</code>（散列表）通过键（key）来存储值。<code>HashMap</code> 的键可以是布尔型、整型、字符串，或任意实现了 <code>Eq</code> 和 <code>Hash</code> trait 的其他类型。在下一节将进一步介绍。</p>\\n<p>和 vector 类似，<code>HashMap</code> 也是可增长的，但 HashMap 在占据了多余空间时还可以缩小自己。可以使用 <code>HashMap::with_capacity(unit)</code> 创建具有一定初始容量的 HashMap，也可以使用 <code>HashMap::new()</code> 来获得一个带有默认初始容量的 HashMap（这是推荐方式）。</p>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"std/hash.md","value":{"title":"hash","path":"std/hash.md","outlink":[],"backlink":["SUMMARY.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"std/hash.md"}]}}}');export{o as comp,d as data};
