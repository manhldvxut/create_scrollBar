
(function () {
    var configScrollBar = {
        createElement : '.scrollable',
        createScrollBarWidth: true,
        createScrollBarHeight: true,
    }

    var allScrollable = document.querySelectorAll(configScrollBar.createElement);

    function init(scrollContainer){

      if(!(scrollContainer instanceof Element)) {
            return { createScroller : function(){} };
        }
      
        var scrollContentWrapper = scrollContainer.querySelector('div'),
            contentPosition = 0,
            scrollerBeingDragged = false,
            scrollerBeingDraggedHeight = false,
            scroller_bottom,
            scroller_right,
            topPositionWidth,
            topPositionHeight,
            scrollerWidth, // width
            scrollerHeight; // height


        function calculateScrollerWidth() {
            // Calculation of how tall scroller should be
            let visibleRatio = scrollContainer.offsetWidth / scrollContentWrapper.scrollWidth;
            return visibleRatio * scrollContainer.offsetWidth;
        }

        // create Height
        function calculateScrollerHeight() {
            // Calculation of how tall scroller should be
            let visibleRatioHeight = scrollContainer.offsetHeight / scrollContentWrapper.scrollHeight;
            return visibleRatioHeight * scrollContainer.offsetHeight;
        }

        // end

        function moveScrollerWidth(evt) {
            // Move Scroll bar to top offset
            let scrollPercentage = evt.target.scrollLeft / scrollContentWrapper.scrollWidth;
            topPositionWidth = scrollPercentage * (scrollContainer.offsetWidth - 0); // 5px arbitrary offset so scroll bar doesn't move too far beyond content wrapper bounding box
            scroller_bottom.style.left = topPositionWidth  + 'px';
        }

        function moveScrollerHeight(evtH) {
            // Move Scroll bar to top offset
            let scrollPercentage = evtH.target.scrollTop / scrollContentWrapper.scrollHeight;
            topPositionHeight = scrollPercentage * (scrollContainer.offsetHeight - 0); // 5px arbitrary offset so scroll bar doesn't move too far beyond content wrapper bounding box
            scroller_right.style.top = topPositionHeight  + 'px';
        }

        function startDrag(evt) {
            normalizedPosition = evt.pageX;
            contentPosition = scrollContentWrapper.scrollLeft;
            scrollerBeingDragged = true;
        }

        function startDragHeight(evtH) {
            normalizedPosition = evtH.pageY;
            contentPosition = scrollContentWrapper.scrollTop;
            scrollerBeingDraggedHeight = true;
        }

        function stopDrag(evt) {
            scrollerBeingDragged = false;
        }

        function stopDragHeight(evtH) {
            scrollerBeingDraggedHeight = false;
        }

        function scrollBarScroll(evt) {
            if (scrollerBeingDragged === true) {
                let mouseDifferential = evt.pageX - normalizedPosition;
                let scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollWidth / scrollContainer.offsetWidth);
                scrollContentWrapper.scrollLeft = contentPosition + scrollEquivalent;
            }
        }

        // height

        function scrollBarScrollHeight(evtH) {
            if (scrollerBeingDraggedHeight === true) {
                let mouseDifferential = evtH.pageY - normalizedPosition;
                let scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollHeight / scrollContainer.offsetHeight);
                scrollContentWrapper.scrollTop = contentPosition + scrollEquivalent;
            }
        }

        function createScroller() {
            // *Creates scroller element and appends to '.scrollable' div
            if(configScrollBar.createScrollBarWidth === true) {
                // create  width
                scroller_bottom = document.createElement("div");
                scroller_bottom.className = 'scroller';

                // determine how big scroller should be based on content
                scrollerWidth = calculateScrollerWidth();

                if (scrollerWidth / scrollContainer.offsetWidth < 1){
                    // *If there is a need to have scroll bar based on content size
                    scroller_bottom.style.width = scrollerWidth + 'px';

                    // append scroller to scrollContainer div
                    scrollContainer.appendChild(scroller_bottom);

                    // show scroll path divot
                    scrollContainer.className += ' showScroll';

                    // attach related draggable listeners
                    scroller_bottom.addEventListener('mousedown', startDrag);
                    window.addEventListener('mouseup', stopDrag);
                    window.addEventListener('mousemove', scrollBarScroll)
                }
            }

            if(configScrollBar.createScrollBarHeight === true) {
                // height
                scroller_right = document.createElement("div");
                scroller_right.className = ' scroller02';

                scrollerHeight = calculateScrollerHeight()

                if (scrollerHeight / scrollContainer.offsetHeight < 1){
                    // *If there is a need to have scroll bar based on content size
                    scroller_right.style.height = scrollerHeight + 'px';

                    // append scroller to scrollContainer div
                    scrollContainer.appendChild(scroller_right);

                    // show scroll path divot
                    scrollContainer.className += ' showScroll02';

                    // attach related draggable listeners
                    scroller_right.addEventListener('mousedown', startDragHeight);
                    window.addEventListener('mouseup', stopDragHeight);
                    window.addEventListener('mousemove', scrollBarScrollHeight)
                }
            }
        }
        // *** Listeners ***
        if(configScrollBar.createScrollBarWidth === true) {
            scrollContentWrapper.addEventListener('scroll', moveScrollerWidth); // width
        }

        if(configScrollBar.createScrollBarHeight === true) {
            scrollContentWrapper.addEventListener('scroll', moveScrollerHeight); // height
        }


        return { createScroller };
    }

    if(allScrollable.length <= 0) {
        return;
    }

    for(let index in allScrollable) {
        init(allScrollable[index]).createScroller();
    }
  
})();
