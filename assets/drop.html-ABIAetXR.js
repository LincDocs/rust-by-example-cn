import{_ as s,e as a,k as e,o as i}from"./app-CVSWwIkE.js";const p={};function l(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="drop" tabindex="-1"><a class="header-anchor" href="#drop"><span>Drop</span></a></h1><p><a href="https://rustwiki.org/zh-CN/std/ops/trait.Drop.html" target="_blank" rel="noopener noreferrer"><code>Drop</code></a> trait 只有一个方法：<code>drop</code>，当对象离开作用域时会自动调用该方法。<code>Drop</code> trait 的主要作用是释放实现者的实例拥有的资源。</p><p><code>Box</code>，<code>Vec</code>，<code>String</code>，<code>File</code>，以及 <code>Process</code> 是一些实现了 <code>Drop</code> trait 来释放资源的类型。<code>Drop</code> trait 也可以为任何自定义数据类型手动实现。</p><p>下面示例给 <code>drop</code> 函数增加了打印到控制台的功能，用于宣布它在什么时候被调用。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>struct Droppable {</span></span>
<span class="line"><span>    name: &amp;&#39;static str,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 这个简单的 \`drop\` 实现添加了打印到控制台的功能。</span></span>
<span class="line"><span>impl Drop for Droppable {</span></span>
<span class="line"><span>    fn drop(&amp;mut self) {</span></span>
<span class="line"><span>        println!(&quot;&gt; Dropping {}&quot;, self.name);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let _a = Droppable { name: &quot;a&quot; };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 代码块 A</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        let _b = Droppable { name: &quot;b&quot; };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 代码块 B</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            let _c = Droppable { name: &quot;c&quot; };</span></span>
<span class="line"><span>            let _d = Droppable { name: &quot;d&quot; };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            println!(&quot;Exiting block B&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        println!(&quot;Just exited block B&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        println!(&quot;Exiting block A&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    println!(&quot;Just exited block A&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 变量可以手动使用 \`drop\` 函数来销毁。</span></span>
<span class="line"><span>    drop(_a);</span></span>
<span class="line"><span>    // 试一试 ^ 将此行注释掉。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    println!(&quot;end of the main function&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // \`_a\` *不会*在这里再次销毁，因为它已经被（手动）销毁。</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)]))}const o=s(p,[["render",l],["__file","drop.html.vue"]]),d=JSON.parse('{"path":"/trait/drop.html","title":"Drop","lang":"zh-CN","frontmatter":{"description":"Drop Drop trait 只有一个方法：drop，当对象离开作用域时会自动调用该方法。Drop trait 的主要作用是释放实现者的实例拥有的资源。 Box，Vec，String，File，以及 Process 是一些实现了 Drop trait 来释放资源的类型。Drop trait 也可以为任何自定义数据类型手动实现。 下面示例给 drop ...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn-/trait/drop.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn-"}],["meta",{"property":"og:title","content":"Drop"}],["meta",{"property":"og:description","content":"Drop Drop trait 只有一个方法：drop，当对象离开作用域时会自动调用该方法。Drop trait 的主要作用是释放实现者的实例拥有的资源。 Box，Vec，String，File，以及 Process 是一些实现了 Drop trait 来释放资源的类型。Drop trait 也可以为任何自定义数据类型手动实现。 下面示例给 drop ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Drop\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn-/\\"}]}"]]},"git":{},"readingTime":{"minutes":0.9,"words":271},"filePathRelative":"trait/drop.md","excerpt":"\\n<p><a href=\\"https://rustwiki.org/zh-CN/std/ops/trait.Drop.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"><code>Drop</code></a> trait 只有一个方法：<code>drop</code>，当对象离开作用域时会自动调用该方法。<code>Drop</code> trait 的主要作用是释放实现者的实例拥有的资源。</p>\\n<p><code>Box</code>，<code>Vec</code>，<code>String</code>，<code>File</code>，以及 <code>Process</code> 是一些实现了 <code>Drop</code> trait 来释放资源的类型。<code>Drop</code> trait 也可以为任何自定义数据类型手动实现。</p>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"trait/drop.md","value":{"title":"drop","path":"trait/drop.md","outlink":[],"backlink":["SUMMARY.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"trait/drop.md"}]}}}');export{o as comp,d as data};
