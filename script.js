document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 项目详情模态框逻辑
    var projectModal = document.getElementById('project-modal');
    var projectClose = projectModal.querySelector('.close-button');

    // 打开模态框
    document.querySelectorAll('.modal-trigger').forEach(function(detail) {
        detail.addEventListener('click', function() {
            projectModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // 定义关闭模态框的函数，添加关闭动画
    function closeModal(modal) {
        var modalContent = modal.querySelector('.modal-content');
        modal.classList.add('closing');
        modalContent.classList.add('closing');
        modalContent.addEventListener('animationend', function handler() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.classList.remove('closing');
            modalContent.classList.remove('closing');
            modalContent.removeEventListener('animationend', handler);
        });
    }

    // 通过点击关闭按钮关闭模态框
    projectClose.addEventListener('click', function() {
        closeModal(projectModal);
    });

    // 通过点击模态框外部关闭模态框
    window.addEventListener('click', function(e) {
        if(e.target === projectModal) {
            closeModal(projectModal);
        }
    });

    // 通过按 Esc 键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.style.display === 'block') {
            closeModal(projectModal);
        }
    });

    // 主修课程与绩点模态框逻辑
    var gradeModal = document.getElementById('grade-modal');
    var gradeClose = gradeModal.querySelector('.close-button');
    var classGrade = document.querySelector('.class-grade');

    classGrade.addEventListener('click', function() {
        gradeModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        renderGradeChart();
    });

    gradeClose.addEventListener('click', function() {
        closeModal(gradeModal);
    });

    window.addEventListener('click', function(e) {
        if(e.target === gradeModal) {
            closeModal(gradeModal);
        }
    });

    // 渲染雷达图
    function renderGradeChart() {
        var chartDom = document.getElementById('grade-chart');
        chartDom.style.width = '100%';
        chartDom.style.height = '80vh';
        var myChart = echarts.init(chartDom);

        var courses = ['程序设计基础','线性代数','高等数学','C++程序设计','数据结构','机器学习','计算机图形学','数据库系统原理','编译原理','计算机网络','可视计算基础'];
        var grades = [4.5, 4.2, 4.0, 4.4, 4.2, 4.4, 5.0, 4.3, 4.4, 5.0, 5.0];

        var indicators = courses.map(function(name) {
            return { name: name, max: 5 };
        });

        var option = {
            title: {
                text: '各课程绩点',
                left: 'center'
            },
            tooltip: {},
            radar: {
                indicator: indicators,
                center: ['50%', '50%'],
                radius: '65%'
            },
            series: [{
                name: '绩点',
                type: 'radar',
                symbol: 'circle',
                symbolSize: 8,
                data: [{
                    value: grades,
                    name: '绩点',
                    label: {
                        show: true,
                        formatter: '{c}'
                    },
                    areaStyle: {
                        opacity: 0.3
                    }
                }]
            }]
        };

        myChart.setOption(option);
    }
});