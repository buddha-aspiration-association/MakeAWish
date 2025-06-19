document.addEventListener('DOMContentLoaded', function() {
    var cursor = document.getElementById('cursor');
    var halo = document.createElement('div');
    halo.classList.add('halo');
    document.body.appendChild(halo);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';

        halo.style.left = (e.pageX - 20) + 'px';
        halo.style.top = (e.pageY - 20) + 'px';
        halo.style.opacity = 1;
    });

    document.addEventListener('mouseout', function() {
        halo.style.opacity = 0;
    });
});




document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelector(".button");
    if (button) {
        var parent = button.parentElement;
        while (parent) {
            parent.style.pointerEvents = 'none';
            parent = parent.parentElement;
        }

        button.style.pointerEvents = 'auto';
    }

    const picture1 = document.querySelector(".picture1");
    const picture2 = document.querySelector(".picture2");
    const picture3 = document.querySelector(".picture3");
    const brand = document.querySelector(".brandpic");
    const cloud01 = document.querySelector(".cloud01");
    const cloud02 = document.querySelector(".cloud02");
    const cloud03 = document.querySelector(".cloud03");
    const cloud04 = document.querySelector(".cloud04");

    picture1.style.transition = 'opacity 3s ease';
    brand.style.transition = 'opacity 7s ease';

    picture2.style.transition = 'left 2.5s, opacity 2s';
    picture3.style.transition = 'right 2.5s, opacity 2s';

    cloud01.style.transition = 'left 7s, opacity 8s';
    cloud02.style.transition = 'right 7s, opacity 6s';
    cloud03.style.transition = 'left 4s, opacity 10s';
    cloud04.style.transition = 'right 9s, opacity 9s';

    setTimeout(() => {
        picture1.style.opacity = 1;
        brand.style.opacity = 1;
        picture2.style.left = "0";
        picture2.style.opacity = 1;
        cloud01.style.left = "0";
        cloud01.style.opacity = 0.5;
        cloud02.style.right = "0";
        cloud02.style.opacity = 0.3;
        picture3.style.right = "0";
        picture3.style.opacity = 1;
        cloud03.style.left = "0";
        cloud03.style.opacity = 0.5;
        cloud04.style.right = "0";
        cloud04.style.opacity = 0.3;
    }, 1000);
});