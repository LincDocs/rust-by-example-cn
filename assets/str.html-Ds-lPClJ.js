import{_ as n,e as a,k as e,o as i}from"./app-CY03Lsxp.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h1><p>Rust 中有两种字符串类型：<code>String</code> 和 <code>&amp;str</code>。</p><p><code>String</code> 被存储为由字节组成的 vector（<code>Vec&lt;u8&gt;</code>），但保证了它一定是一个有效的<br> UTF-8 序列。<code>String</code> 是堆分配的，可增长的，且不是零结尾的（null terminated）。</p><p><code>&amp;str</code> 是一个总是指向有效 UTF-8 序列的切片（<code>&amp;[u8]</code>），并可用来查看 <code>String</code> 的内容，就如同 <code>&amp;[T]</code> 是 <code>Vec&lt;T&gt;</code> 的全部或部分引用。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>fn main() {</span></span>
<span class="line"><span>    // （所有的类型标注都不是必需的）</span></span>
<span class="line"><span>    // 一个对只读内存中分配的字符串的引用</span></span>
<span class="line"><span>    let pangram: &amp;&#39;static str = &quot;the quick brown fox jumps over the lazy dog&quot;;</span></span>
<span class="line"><span>    println!(&quot;Pangram: {}&quot;, pangram);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 逆序迭代单词，这里并没有分配新的字符串</span></span>
<span class="line"><span>    println!(&quot;Words in reverse&quot;);</span></span>
<span class="line"><span>    for word in pangram.split_whitespace().rev() {</span></span>
<span class="line"><span>        println!(&quot;&gt; {}&quot;, word);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 复制字符到一个 vector，排序并移除重复值</span></span>
<span class="line"><span>    let mut chars: Vec&lt;char&gt; = pangram.chars().collect();</span></span>
<span class="line"><span>    chars.sort();</span></span>
<span class="line"><span>    chars.dedup();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 创建一个空的且可增长的 \`String\`</span></span>
<span class="line"><span>    let mut string = String::new();</span></span>
<span class="line"><span>    for c in chars {</span></span>
<span class="line"><span>        // 在字符串的尾部插入一个字符</span></span>
<span class="line"><span>        string.push(c);</span></span>
<span class="line"><span>        // 在字符串尾部插入一个字符串</span></span>
<span class="line"><span>        string.push_str(&quot;, &quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 这个缩短的字符串是原字符串的一个切片，所以没有执行新的分配操作</span></span>
<span class="line"><span>    let chars_to_trim: &amp;[char] = &amp;[&#39; &#39;, &#39;,&#39;];</span></span>
<span class="line"><span>    let trimmed_str: &amp;str = string.trim_matches(chars_to_trim);</span></span>
<span class="line"><span>    println!(&quot;Used characters: {}&quot;, trimmed_str);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 堆分配一个字符串</span></span>
<span class="line"><span>    let alice = String::from(&quot;I like dogs&quot;);</span></span>
<span class="line"><span>    // 分配新内存并存储修改过的字符串</span></span>
<span class="line"><span>    let bob: String = alice.replace(&quot;dog&quot;, &quot;cat&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    println!(&quot;Alice says: {}&quot;, alice);</span></span>
<span class="line"><span>    println!(&quot;Bob says: {}&quot;, bob);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更多 <code>str</code>/<code>String</code> 方法可以在 <a href="https://rustwiki.org/zh-CN/std/str/" target="_blank" rel="noopener noreferrer">std::str</a> 和 <a href="https://rustwiki.org/zh-CN/std/string/" target="_blank" rel="noopener noreferrer">std::string</a> 模块中找到。</p><h2 id="字面量与转义字符" tabindex="-1"><a class="header-anchor" href="#字面量与转义字符"><span>字面量与转义字符</span></a></h2><p>书写含有特殊字符的字符串字面量有很多种方法。它们都会产生类似的 <code>&amp;str</code>，所以最好选择最方便的写法。类似地，字节串（byte string）字面量也有多种写法，它们都会产生<br><code>&amp;[u8; N]</code> 类型。</p><p>通常特殊字符是使用反斜杠字符 <code>\\</code> 来转义的，这样你就可以在字符串中写入各种各样的字符，甚至是不可打印的字符以及你不知道如何输入的字符。如果你需要反斜杠字符，再用另一个反斜杠来转义它就可以，像这样：<code>\\\\</code>。</p><p>字面量中出现的字符串或字符定界符必须转义：<code>&quot;\\&quot;&quot;</code>、<code>&#39;\\&#39;&#39;</code>。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>fn main() {</span></span>
<span class="line"><span>    // 通过转义，可以用十六进制值来表示字节。</span></span>
<span class="line"><span>    let byte_escape = &quot;I&#39;m writing \\x52\\x75\\x73\\x74!&quot;;</span></span>
<span class="line"><span>    println!(&quot;What are you doing\\x3F (\\\\x3F means ?) {}&quot;, byte_escape);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 也可以使用 Unicode 码位表示。</span></span>
<span class="line"><span>    let unicode_codepoint = &quot;\\u{211D}&quot;;</span></span>
<span class="line"><span>    let character_name = &quot;\\&quot;DOUBLE-STRUCK CAPITAL R\\&quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    println!(&quot;Unicode character {} (U+211D) is called {}&quot;,</span></span>
<span class="line"><span>                unicode_codepoint, character_name );</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let long_string = &quot;String literals</span></span>
<span class="line"><span>                        can span multiple lines.</span></span>
<span class="line"><span>                        The linebreak and indentation here -&gt;\\</span></span>
<span class="line"><span>                        &lt;- can be escaped too!&quot;;</span></span>
<span class="line"><span>    println!(&quot;{}&quot;, long_string);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有时会有太多需要转义的字符，或者是直接原样写出会更便利。这时可以使用原始字符串（raw string）。</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let raw_str = r&quot;Escapes don&#39;t work here: \\x3F \\u{211D}&quot;;</span></span>
<span class="line"><span>    println!(&quot;{}&quot;, raw_str);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果你要在原始字符串中写引号，请在两边加一对 #</span></span>
<span class="line"><span>    let quotes = r#&quot;And then I said: &quot;There is no escape!&quot;&quot;#;</span></span>
<span class="line"><span>    println!(&quot;{}&quot;, quotes);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果字符串中需要写 &quot;#，那就在定界符中使用更多的 #。</span></span>
<span class="line"><span>    // 可使用的 # 的数目没有限制。</span></span>
<span class="line"><span>    let longer_delimiter = r###&quot;A string with &quot;# in it. And even &quot;##!&quot;###;</span></span>
<span class="line"><span>    println!(&quot;{}&quot;, longer_delimiter);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>想要非 UTF-8 字符串（记住，<code>&amp;str</code> 和 <code>String</code> 都必须是合法的 UTF-8 序列），或者需要一个字节数组，其中大部分是文本？请使用字节串（byte string）！</p><div class="language-rust,editable line-numbers-mode" data-highlighter="shiki" data-ext="rust,editable" data-title="rust,editable" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>use std::str;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    // 注意这并不是一个 &amp;str</span></span>
<span class="line"><span>    let bytestring: &amp;[u8; 20] = b&quot;this is a bytestring&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 字节串没有实现 Display，所以它们的打印功能有些受限</span></span>
<span class="line"><span>    println!(&quot;A bytestring: {:?}&quot;, bytestring);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 字节串可以使用单字节的转义字符...</span></span>
<span class="line"><span>    let escaped = b&quot;\\x52\\x75\\x73\\x74 as bytes&quot;;</span></span>
<span class="line"><span>    // ...但不能使用 Unicode 转义字符</span></span>
<span class="line"><span>    // let escaped = b&quot;\\u{211D} is not allowed&quot;;</span></span>
<span class="line"><span>    println!(&quot;Some escaped bytes: {:?}&quot;, escaped);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 原始字节串和原始字符串的写法一样</span></span>
<span class="line"><span>    let raw_bytestring = br&quot;\\u{211D} is not escaped here&quot;;</span></span>
<span class="line"><span>    println!(&quot;{:?}&quot;, raw_bytestring);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 把字节串转换为 &amp;str 可能失败</span></span>
<span class="line"><span>    if let Ok(my_str) = str::from_utf8(raw_bytestring) {</span></span>
<span class="line"><span>        println!(&quot;And the same as text: &#39;{}&#39;&quot;, my_str);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let quotes = br#&quot;You can also use &quot;fancier&quot; formatting, \\</span></span>
<span class="line"><span>                    like with normal raw strings&quot;#;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 字节串可以不使用 UTF-8 编码</span></span>
<span class="line"><span>    let shift_jis = b&quot;\\x82\\xe6\\x82\\xa8\\x82\\xb1\\x82&quot;; // SHIFT-JIS 编码的 &quot;ようこそ&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 但这样的话它们就无法转换成 &amp;str 了</span></span>
<span class="line"><span>    match str::from_utf8(shift_jis) {</span></span>
<span class="line"><span>        Ok(my_str) =&gt; println!(&quot;Conversion successful: &#39;{}&#39;&quot;, my_str),</span></span>
<span class="line"><span>        Err(e) =&gt; println!(&quot;Conversion failed: {:?}&quot;, e),</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若需要在编码间转换，请使用 <a href="https://crates.io/crates/encoding" target="_blank" rel="noopener noreferrer">encoding</a> crate。</p><p>Rust 参考中的 <a href="https://rustwiki.org/zh-CN/reference/tokens.html" target="_blank" rel="noopener noreferrer">Tokens</a> 一章详细地列出了书写字符串字面量和转义字符的方法。</p>`,17)]))}const d=n(l,[["render",p],["__file","str.html.vue"]]),c=JSON.parse('{"path":"/std/str.html","title":"字符串","lang":"zh-CN","frontmatter":{"description":"字符串 Rust 中有两种字符串类型：String 和 &str。 String 被存储为由字节组成的 vector（Vec<u8>），但保证了它一定是一个有效的 UTF-8 序列。String 是堆分配的，可增长的，且不是零结尾的（null terminated）。 &str 是一个总是指向有效 UTF-8 序列的切片（&[u8]），并可用来查看 S...","head":[["meta",{"property":"og:url","content":"https://LincDocs.github.io/rust-by-example-cn/std/str.html"}],["meta",{"property":"og:site_name","content":"rust-by-example-cn"}],["meta",{"property":"og:title","content":"字符串"}],["meta",{"property":"og:description","content":"字符串 Rust 中有两种字符串类型：String 和 &str。 String 被存储为由字节组成的 vector（Vec<u8>），但保证了它一定是一个有效的 UTF-8 序列。String 是堆分配的，可增长的，且不是零结尾的（null terminated）。 &str 是一个总是指向有效 UTF-8 序列的切片（&[u8]），并可用来查看 S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LincDocs\\",\\"url\\":\\"https://github.com/LincDocs/rust-by-example-cn/\\"}]}"]]},"git":{},"readingTime":{"minutes":3.8,"words":1141},"filePathRelative":"std/str.md","excerpt":"\\n<p>Rust 中有两种字符串类型：<code>String</code> 和 <code>&amp;str</code>。</p>\\n<p><code>String</code> 被存储为由字节组成的 vector（<code>Vec&lt;u8&gt;</code>），但保证了它一定是一个有效的<br>\\nUTF-8 序列。<code>String</code> 是堆分配的，可增长的，且不是零结尾的（null terminated）。</p>\\n<p><code>&amp;str</code> 是一个总是指向有效 UTF-8 序列的切片（<code>&amp;[u8]</code>），并可用来查看 <code>String</code> 的内容，就如同 <code>&amp;[T]</code> 是 <code>Vec&lt;T&gt;</code> 的全部或部分引用。</p>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[{"title":"SUMMARY","link":"SUMMARY.html"},{"title":"enum","link":"custom_types/enum.html"},{"title":"print","link":"hello/print.html"}],"localMap":{"nodes":[{"id":"std/str.md","value":{"title":"str","path":"std/str.md","outlink":[],"backlink":["SUMMARY.md","custom_types/enum.md","hello/print.md"]}},{"id":"SUMMARY.md","value":{"title":"SUMMARY","path":"SUMMARY.md","outlink":[],"backlink":[]}},{"id":"custom_types/enum.md","value":{"title":"enum","path":"custom_types/enum.md","outlink":[],"backlink":[]}},{"id":"hello/print.md","value":{"title":"print","path":"hello/print.md","outlink":[],"backlink":[]}}],"links":[{"source":"SUMMARY.md","target":"std/str.md"},{"source":"custom_types/enum.md","target":"std/str.md"},{"source":"hello/print.md","target":"std/str.md"}]}}}');export{d as comp,c as data};
