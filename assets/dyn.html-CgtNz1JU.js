import{_ as a,e as s,k as i,o as e}from"./app-CY03Lsxp.js";const l={};function t(p,n){return e(),s("div",null,n[0]||(n[0]=[i(`<h1 id="使用-dyn-返回-trait" tabindex="-1"><a class="header-anchor" href="#使用-dyn-返回-trait"><span>使用 <code>dyn</code> 返回 trait</span></a></h1><p>Rust 编译器需要知道每个函数的返回类型需要多少空间。这意味着所有函数都必须返回一个具体类型。与其他语言不同，如果你有个像 <code>Animal</code> 那样的的 trait，则不能编写返回 <code>Animal</code> 的函数，因为其不同的实现将需要不同的内存量。</p><p>但是，有一个简单的解决方法。相比于直接返回一个 trait 对象，我们的函数返回一个包含一些 <code>Animal</code> 的 <code>Box</code>。<code>box</code> 只是对堆中某些内存的引用。因为引用的大小是静态已知的，并且编译器可以保证引用指向已分配的堆 <code>Animal</code>，所以我们可以从函数中返回 trait！</p><p>每当在堆上分配内存时，Rust 都会尝试尽可能明确。因此，如果你的函数以这种方式返回指向堆的 trait 指针，则需要使用 <code>dyn</code> 关键字编写返回类型，例如 <code>Box&lt;dyn Animal&gt;</code>。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>struct Sheep {}</span></span>
<span class="line"><span>struct Cow {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>trait Animal {</span></span>
<span class="line"><span>    // 实例方法签名</span></span>
<span class="line"><span>    fn noise(&amp;self) -&gt; &amp;&#39;static str;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 实现 \`Sheep\` 的 \`Animal\` trait。</span></span>
<span class="line"><span>impl Animal for Sheep {</span></span>
<span class="line"><span>    fn noise(&amp;self) -&gt; &amp;&#39;static str {</span></span>
<span class="line"><span>        &quot;baaaaah!&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 实现 \`Cow\` 的 \`Animal\` trait。</span></span>
<span class="line"><span>impl Animal for Cow {</span></span>
<span class="line"><span>    fn noise(&amp;self) -&gt; &amp;&#39;static str {</span></span>
<span class="line"><span>        &quot;moooooo!&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 返回一些实现 Animal 的结构体，但是在编译时我们不知道哪个结构体。</span></span>
<span class="line"><span>fn random_animal(random_number: f64) -&gt; Box&lt;dyn Animal&gt; {</span></span>
<span class="line"><span>    if random_number &lt; 0.5 {</span></span>
<span class="line"><span>        Box::new(Sheep {})</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        Box::new(Cow {})</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let random_number = 0.234;</span></span>
<span class="line"><span>    let animal = random_animal(random_number);</span></span>
<span class="line"><span>    println!(&quot;You&#39;ve randomly chosen an animal, and it says {}&quot;, animal.noise());</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)]))}const c=a(l,[["render",t],["__file","dyn.html.vue"]]),r=JSON.parse('{"path":"/trait/dyn.html","title":"使用 dyn 返回 trait","lang":"zh-CN","frontmatter":{"description":"使用 dyn 返回 trait Rust 编译器需要知道每个函数的返回类型需要多少空间。这意味着所有函数都必须返回一个具体类型。与其他语言不同，如果你有个像 Animal 那样的的 trait，则不能编写返回 Animal 的函数，因为其不同的实现将需要不同的内存量。 但是，有一个简单的解决方法。相比于直接返回一个 trait 对象，我们的函数返回一个...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn/trait/dyn.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn"}],["meta",{"property":"og:title","content":"使用 dyn 返回 trait"}],["meta",{"property":"og:description","content":"使用 dyn 返回 trait Rust 编译器需要知道每个函数的返回类型需要多少空间。这意味着所有函数都必须返回一个具体类型。与其他语言不同，如果你有个像 Animal 那样的的 trait，则不能编写返回 Animal 的函数，因为其不同的实现将需要不同的内存量。 但是，有一个简单的解决方法。相比于直接返回一个 trait 对象，我们的函数返回一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用 dyn 返回 trait\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.25,"words":374},"filePathRelative":"trait/dyn.md","excerpt":"\\n<p>Rust 编译器需要知道每个函数的返回类型需要多少空间。这意味着所有函数都必须返回一个具体类型。与其他语言不同，如果你有个像 <code>Animal</code> 那样的的 trait，则不能编写返回 <code>Animal</code> 的函数，因为其不同的实现将需要不同的内存量。</p>\\n<p>但是，有一个简单的解决方法。相比于直接返回一个 trait 对象，我们的函数返回一个包含一些 <code>Animal</code> 的 <code>Box</code>。<code>box</code> 只是对堆中某些内存的引用。因为引用的大小是静态已知的，并且编译器可以保证引用指向已分配的堆 <code>Animal</code>，所以我们可以从函数中返回 trait！</p>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"trait/dyn.md","value":{"title":"dyn","path":"trait/dyn.md","outlink":[],"backlink":["SUMMARY.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"trait/dyn.md"}]}}}');export{c as comp,r as data};
