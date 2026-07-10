const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// ============================================================
// ✅ البيانات الحقيقية لمشروعك (تم تعبئتها بالفعل)
// ============================================================
const GITHUB_OWNER = 'malegal';        // اسم المستخدم في GitHub
const GITHUB_REPO = 'mahmoud-legal';   // اسم المستودع
const BRANCH = 'main';                 // اسم الفرع
const BLOG_PATH = 'blog/articles';     // المسار الذي توجد فيه المقالات
// ============================================================

async function buildSite() {
    try {
        console.log('🚀 جاري بناء الموقع وجلب أحدث المقالات من GitHub...');

        // 1. جلب قائمة الملفات من GitHub
        const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${BLOG_PATH}?ref=${BRANCH}`;
        const response = await fetch(apiUrl, {
            headers: { 'User-Agent': 'Vercel-Build-Script' }
        });

        if (!response.ok) {
            throw new Error(`فشل الاتصال بـ GitHub API (الحالة: ${response.status})`);
        }

        const files = await response.json();
        
        // 2. تصفية ملفات Markdown فقط، وعكس الترتيب (الأحدث أولاً)، وأخذ أحدث 3
        const mdFiles = files
            .filter(file => file.type === 'file' && file.name.endsWith('.md'))
            .reverse()
            .slice(0, 3);

        let articlesHtml = '';

        if (mdFiles.length === 0) {
            articlesHtml = `
                <div class="col-span-full text-center text-charcoal/50 py-10">
                    لا توجد مقالات حالياً.
                </div>
            `;
        }

        // 3. حلقة لقراءة كل ملف وتحويله إلى كارت HTML
        for (const file of mdFiles) {
            const slug = file.name.replace('.md', '');
            let title = slug.replace(/-/g, ' ');
            let imageUrl = '';
            let description = '';

            try {
                // جلب محتوى ملف Markdown الفعلي
                const contentRes = await fetch(file.download_url);
                const content = await contentRes.text();
                
                // استخراج البيانات من الـ Front Matter (إن وجدت)
                const yamlMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
                if (yamlMatch) {
                    const frontMatter = yamlMatch[1];
                    const titleMatch = frontMatter.match(/title:\s*(.*)/i);
                    if (titleMatch) title = titleMatch[1].replace(/['"]/g, '').trim();
                    
                    const imageMatch = frontMatter.match(/image:\s*(.*)/i);
                    if (imageMatch) imageUrl = imageMatch[1].replace(/['"]/g, '').trim();
                    
                    const descMatch = frontMatter.match(/description:\s*(.*)/i);
                    if (descMatch) description = descMatch[1].replace(/['"]/g, '').trim();
                }
            } catch (e) { 
                // في حال حدوث خطأ في القراءة، نستخدم القيم الافتراضية
                console.warn(`⚠️ تعذر قراءة البيانات من ${file.name}، سيتم استخدام القيم الافتراضية.`);
            }

            // بناء نمط الخلفية للصورة (إن وجدت)
            const imageStyle = imageUrl 
                ? `background-image: url('${imageUrl}'); background-size: cover; background-position: center;` 
                : 'background: var(--light-gray); display: flex; align-items: center; justify-content: center; color: rgba(34,34,34,0.15); font-size: 1.5rem;';

            // 4. بناء كارت المقالة بنفس هيكل التصميم الموجود في موقعك
            articlesHtml += `
                <div class="blog-card reveal">
                    <div class="image" style="${imageStyle}">
                        ${!imageUrl ? '⚖️' : ''}
                    </div>
                    <div class="content">
                        <div class="meta">
                            <span>${Math.ceil(title.length / 50) || 1} دقائق قراءة</span>
                        </div>
                        <h3>${title}</h3>
                        <p>${description || 'تحليل قانوني متخصص في مجال القانون المصري.'}</p>
                        <a href="article.html?slug=${encodeURIComponent(slug)}" class="read-more">اقرأ المقال ←</a>
                    </div>
                </div>
            `;
        }

        // 5. قراءة ملف القالب (template.html)
        const templatePath = path.join(__dirname, 'template.html');
        if (!fs.existsSync(templatePath)) {
            throw new Error('الملف template.html غير موجود في المجلد! تأكد من وجوده.');
        }
        let template = fs.readFileSync(templatePath, 'utf8');

        // 6. استبدال العنصر النائب بالمقالات المولدة
        const finalHtml = template.replace('<!-- ARTICLES_PLACEHOLDER -->', articlesHtml);

        // 7. كتابة الملف النهائي index.html
        fs.writeFileSync(path.join(__dirname, 'index.html'), finalHtml);
        console.log(`✅ تم إنشاء index.html بنجاح مع ${mdFiles.length} مقالة ثابتة!`);

    } catch (error) {
        console.error('❌ فشلت عملية البناء:', error.message);
        process.exit(1);
    }
}

// 8. تشغيل الدالة
buildSite();
