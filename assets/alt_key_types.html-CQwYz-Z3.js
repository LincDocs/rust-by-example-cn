import{_ as s,e as a,k as e,o as i}from"./app-CVSWwIkE.js";const l={};function p(c,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="更改或自定义关键字类型" tabindex="-1"><a class="header-anchor" href="#更改或自定义关键字类型"><span>更改或自定义关键字类型</span></a></h1><p>任何实现了 <code>Eq</code> 和 <code>Hash</code> trait 的类型都可以充当 <code>HashMap</code> 的键。这包括：</p><ul><li><code>bool</code> （当然这个用处不大，因为只有两个可能的键）</li><li><code>int</code>，<code>unit</code>，以及其他整数类型</li><li><code>String</code> 和 <code>&amp;str</code>（友情提示：如果使用 <code>String</code> 作为键来创建 <code>HashMap</code>，则可以<br> 将 <code>&amp;str</code> 作为散列表的 <code>.get()</code> 方法的参数，以获取值）</li></ul><p>注意到 <code>f32</code> 和 <code>f64</code> <strong>没有</strong>实现 <code>Hash</code>，这很大程度上是由于若使用浮点数作为散列表的键，<a href="https://en.wikipedia.org/wiki/Floating_point#Accuracy_problems" target="_blank" rel="noopener noreferrer">浮点精度误差</a>会很容易导致错误。</p><p>对于所有的集合类（collection class），如果它们包含的类型都分别实现了 <code>Eq</code><br> 和 <code>Hash</code>，那么这些集合类也就实现了 <code>Eq</code> 和 <code>Hash</code>。例如，若 <code>T</code> 实现了<br><code>Hash</code>，则 <code>Vec&lt;T&gt;</code> 也实现了 <code>Hash</code>。</p><p>对自定义类型可以轻松地实现 <code>Eq</code> 和 <code>Hash</code>，只需加上一行代码：<code>#[derive(PartialEq, Eq, Hash)]</code>。</p><p>编译器将会完成余下的工作。如果你想控制更多的细节，你可以手动实现 <code>Eq</code> 和/或 <code>Hash</code>。本指南不包含实现 <code>Hash</code> 的细节内容。</p><p>为了试验 <code>HashMap</code> 中的 <code>struct</code>，让我们试着做一个非常简易的用户登录系统：</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>use std::collections::HashMap;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Eq 要求你对此类型推导 PartiaEq。</span></span>
<span class="line"><span>#[derive(PartialEq, Eq, Hash)]</span></span>
<span class="line"><span>struct Account&lt;&#39;a&gt;{</span></span>
<span class="line"><span>    username: &amp;&#39;a str,</span></span>
<span class="line"><span>    password: &amp;&#39;a str,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct AccountInfo&lt;&#39;a&gt;{</span></span>
<span class="line"><span>    name: &amp;&#39;a str,</span></span>
<span class="line"><span>    email: &amp;&#39;a str,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Accounts&lt;&#39;a&gt; = HashMap&lt;Account&lt;&#39;a&gt;, AccountInfo&lt;&#39;a&gt;&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn try_logon&lt;&#39;a&gt;(accounts: &amp;Accounts&lt;&#39;a&gt;,</span></span>
<span class="line"><span>        username: &amp;&#39;a str, password: &amp;&#39;a str){</span></span>
<span class="line"><span>    println!(&quot;Username: {}&quot;, username);</span></span>
<span class="line"><span>    println!(&quot;Password: {}&quot;, password);</span></span>
<span class="line"><span>    println!(&quot;Attempting logon...&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let logon = Account {</span></span>
<span class="line"><span>        username: username,</span></span>
<span class="line"><span>        password: password,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    match accounts.get(&amp;logon) {</span></span>
<span class="line"><span>        Some(account_info) =&gt; {</span></span>
<span class="line"><span>            println!(&quot;Successful logon!&quot;);</span></span>
<span class="line"><span>            println!(&quot;Name: {}&quot;, account_info.name);</span></span>
<span class="line"><span>            println!(&quot;Email: {}&quot;, account_info.email);</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        _ =&gt; println!(&quot;Login failed!&quot;),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(){</span></span>
<span class="line"><span>    let mut accounts: Accounts = HashMap::new();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let account = Account {</span></span>
<span class="line"><span>        username: &quot;j.everyman&quot;,</span></span>
<span class="line"><span>        password: &quot;password123&quot;,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let account_info = AccountInfo {</span></span>
<span class="line"><span>        name: &quot;John Everyman&quot;,</span></span>
<span class="line"><span>        email: &quot;j.everyman@email.com&quot;,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    accounts.insert(account, account_info);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    try_logon(&amp;accounts, &quot;j.everyman&quot;, &quot;psasword123&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    try_logon(&amp;accounts, &quot;j.everyman&quot;, &quot;password123&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)]))}const d=s(l,[["render",p],["__file","alt_key_types.html.vue"]]),o=JSON.parse('{"path":"/std/hash/alt_key_types.html","title":"更改或自定义关键字类型","lang":"zh-CN","frontmatter":{"description":"更改或自定义关键字类型 任何实现了 Eq 和 Hash trait 的类型都可以充当 HashMap 的键。这包括： bool （当然这个用处不大，因为只有两个可能的键） int，unit，以及其他整数类型 String 和 &str（友情提示：如果使用 String 作为键来创建 HashMap，则可以 将 &str 作为散列表的 .get() 方法...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn-/std/hash/alt_key_types.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn-"}],["meta",{"property":"og:title","content":"更改或自定义关键字类型"}],["meta",{"property":"og:description","content":"更改或自定义关键字类型 任何实现了 Eq 和 Hash trait 的类型都可以充当 HashMap 的键。这包括： bool （当然这个用处不大，因为只有两个可能的键） int，unit，以及其他整数类型 String 和 &str（友情提示：如果使用 String 作为键来创建 HashMap，则可以 将 &str 作为散列表的 .get() 方法..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"更改或自定义关键字类型\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn-/\\"}]}"]]},"git":{},"readingTime":{"minutes":1.5,"words":449},"filePathRelative":"std/hash/alt_key_types.md","excerpt":"\\n<p>任何实现了 <code>Eq</code> 和 <code>Hash</code> trait 的类型都可以充当 <code>HashMap</code> 的键。这包括：</p>\\n<ul>\\n<li><code>bool</code> （当然这个用处不大，因为只有两个可能的键）</li>\\n<li><code>int</code>，<code>unit</code>，以及其他整数类型</li>\\n<li><code>String</code> 和 <code>&amp;str</code>（友情提示：如果使用 <code>String</code> 作为键来创建 <code>HashMap</code>，则可以<br>\\n将 <code>&amp;str</code> 作为散列表的 <code>.get()</code> 方法的参数，以获取值）</li>\\n</ul>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"}],"localMap":{"nodes":[{"id":"std/hash/alt_key_types.md","value":{"title":"alt_key_types","path":"std/hash/alt_key_types.md","outlink":[],"backlink":["SUMMARY.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"std/hash/alt_key_types.md"}]}}}');export{d as comp,o as data};
