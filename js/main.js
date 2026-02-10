// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentSlide = 0;
    let slideInterval;

    // 显示指定幻灯片
    function showSlide(index) {
        // 确保索引在有效范围内
        if (index < 0) {
            index = carouselItems.length - 1;
        } else if (index >= carouselItems.length) {
            index = 0;
        }

        // 移除所有活动状态
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // 设置当前幻灯片为活动状态
        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    // 自动轮播
    function startSlideShow() {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // 每5秒切换一次
    }

    // 停止轮播
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // 上一张按钮点击事件
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        stopSlideShow();
        showSlide(currentSlide - 1);
        startSlideShow();
    });

    // 下一张按钮点击事件
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        stopSlideShow();
        showSlide(currentSlide + 1);
        startSlideShow();
    });

    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    // 启动轮播
    startSlideShow();

    // 语言切换功能
    const langBtn = document.getElementById('lang-btn');
    let currentLang = 'zh'; // 默认中文

    // 切换语言函数
    function switchLanguage() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        langBtn.textContent = currentLang === 'zh' ? 'EN' : '中文';

        // 更新所有带有 data-cn 和 data-en 属性的元素
        document.querySelectorAll('[data-cn][data-en]').forEach(element => {
            const content = currentLang === 'zh' ? element.getAttribute('data-cn') : element.getAttribute('data-en');
            element.textContent = content;
        });

        // 更新HTML lang属性
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    }

    // 语言按钮点击事件
    langBtn.addEventListener('click', switchLanguage);

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '15px 0';
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
