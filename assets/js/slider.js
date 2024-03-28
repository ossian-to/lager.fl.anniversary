// 等待文檔加載完成後執行
$(document).ready(function () {
  // 選取所有包含 .slider 的元素
  $(".slider").each(function () {
    // 選取下一個和上一個按鈕
    let next = $(this).find("#next");
    let prev = $(this).find("#prev");
    // 選取所有包含 .item 的元素
    let items = $(this).find(".item");
    // 設置初始圖片的索引，第一張是 0
    let active = 0;

    // 載入並顯示圖片的函式
    function loadShow() {
      // 初始化 stt
      let stt = 0;
      // 設置 active 圖片的樣式
      $(items[active])
        .css({
          transform: "none",
          zIndex: 1,
          filter: "none",
          opacity: 1,
        })
        .find(".item-title, .item-subtitle")
        .css({
          opacity: 1,
          transition: "opacity 1.5s",
        });

      // 迴圈處理後續的圖片
      for (var i = active + 1; i < items.length; i++) {
        // 遞增 stt
        stt++;
        // 設置下一個圖片的樣式
        let opacity = stt > 2 ? 0 : 0.8;
        if ($(window).width() < 600) {
          opacity = stt > 1 ? 0 : 0.8;
        }
        if ($(window).width() < 500) {
          opacity = stt > 0 ? 0 : 0.8;
        }
        $(items[i])
          .css({
            transform: `translateX(${80 * stt}px) scale(${
              1 - 0.2 * stt
            }) perspective(300px) rotateY(-1deg)`,
            zIndex: -stt,
            filter: "blur(0.3em)",
            opacity: opacity,
          })
          .find(".item-title, .item-subtitle")
          .css({
            opacity: 0,
            transition: "opacity 1.5s",
          });
      }
      // 重設 stt
      stt = 0;
      // 處理前面的圖片
      for (var i = active - 1; i >= 0; i--) {
        // 遞增 stt
        stt++;
        // 設置前一個圖片的樣式
        let opacity = stt > 2 ? 0 : 0.8;
        if ($(window).width() < 600) {
          opacity = stt > 1 ? 0 : 0.8;
        }
        if ($(window).width() < 500) {
          opacity = stt > 0 ? 0 : 0.8;
        }
        $(items[i])
          .css({
            transform: `translateX(${-80 * stt}px) scale(${
              1 - 0.2 * stt
            }) perspective(300px) rotateY(1deg)`,
            zIndex: -stt,
            filter: "blur(0.3em)",
            opacity: opacity,
          })
          .find(".item-title, .item-subtitle")
          .css({
            opacity: 0,
            transition: "opacity 1.5s",
          });
      }
    }

    // 呼叫函式以初始化圖片顯示
    loadShow();

    // 設置 next 按鈕的點擊事件處理函式
    next.on("click", function () {
      // 如果增加活躍的圖片索引不超過圖片數量，則增加索引；否則將索引重置為 0
      active = active + 1 < items.length ? active + 1 : 0;
      // 載入並顯示新的圖片
      loadShow();
    });

    // 設置 prev 按鈕的點擊事件處理函式
    prev.on("click", function () {
      // 如果減少活躍的圖片索引不小於 0，則減少索引；否則將索引重置為最後一個圖片的索引
      active = active - 1 >= 0 ? active - 1 : items.length - 1;
      // 載入並顯示新的圖片
      loadShow();
    });

    // 遍歷每個 .item
    $(items).each(function (index) {
      // 為每個 .item 添加點擊事件監聽器
      $(this).on("click", function () {
        // 將活躍的索引設置為下一個項目的索引，如果已經是最後一個項目，則回到第一個項目
        active = (index + 1) % items.length;
        // 加載並顯示新的圖片
        loadShow();
      });
    });
  });
});
