$(function() {
    // Top 버튼
    $(".top_move").click(function(e) {
        e.preventDefault();   // a태그의 href기능을 비활성화
        $("html, body").animate({ scrollTop : "0"}, 500);  // 웹브라우저 창의 맨 상단으로 이동
    });

    //gnb menu
	/*
    let spanRotate = 0;  // li의 화살표 방향을 바꾸기위해 필요한 변수
    $(".gnb_li").click(function() {
        $(this).siblings().find(".gnb_sub").stop().slideUp(500);
        $(this).find(".gnb_sub").stop().slideToggle(500);
        if ( spanRotate % 2 == 0 ) {
            $(this).find("span").css({transform : "rotate(270deg)"});  // slideDown될 경우
        } else {
            $(this).find("span").css({transform : "rotate(90deg)"});  // slideUp될 경우
        }
        spanRotate++;
    });

    $(".gnb_sub").click(function() {  // .gnb_sub요소의 부모요소인 .gnb_li요소의 slideToggle기능을 비활성화하기 위함
        return false;
    });
    $(".gnb_Close").click(function() {  // close버튼을 눌렀을 경우 하위메뉴 slideUp 시키기
        $(".gnb_li").find(".gnb_sub").stop().slideUp(500);
        $(".gnb_li").find("span").css({transform : "rotate(90deg)"});  // slideUp될 경우
        if ( spanRotate % 2 == 1 ) {  // close버튼을 눌렀을 경우 화살표방향이 반대로되는걸 방지하기 위함
            spanRotate = 0;          // spanRotate변수가 홀수값일 경우 무조건 0을 할당해주어 화살표요소의 방향이 에러가 일어나지 않게 한다.
        }
    });
	*/
	$(".gnb_li").hover(
		function() {
			$(this).find(".gnb_sub").stop().slideDown(500);
			$(this).find("span").css({transform : "rotate(270deg)"});  // slideDown될 경우
		},
		function() {
			$(this).find(".gnb_sub").stop().slideUp(500);
			$(this).find("span").css({transform : "rotate(90deg)"});  // slideUp될 경우
		}
	);
	
	// 왼쪽 사이드 메뉴(left_side)
	let open = 0;
	$(".left_side_btn").click(function() {
		if ( open == 0 ) {   // open값이 0일 경우 왼쪽 사이드 메뉴를 보여준다.
			$(this).parent().stop(true).animate({ left : "0px"}, 800, "easeOutBounce");
			
			/*  // 이미지의 left값을 각각 다르게 설정해야할 경우 사용
			$(".carR1").find("img").delay(1000).animate({ left : "840px"}, 3000);
			$(".carR1").find(".carLine").delay(1000).animate({ width : "990px"}, 2900);
			$(".carR2").find("img").delay(1500).animate({ left : "860px"}, 3000);
			$(".carR2").find(".carLine").delay(1500).animate({ width : "990px"}, 2900);
			$(".carR3").find("img").delay(2000).animate({ left : "840px"}, 3000);
			$(".carR3").find(".carLine").delay(2000).animate({ width : "990px"}, 2900);
			$(".carR4").find("img").delay(2500).animate({ left : "840px"}, 3000);
			$(".carR4").find(".carLine").delay(2500).animate({ width : "990px"}, 2900);
			$(".carR5").find("img").delay(3000).animate({ left : "850px"}, 3000);
			$(".carR5").find(".carLine").delay(3000).animate({ width : "990px"}, 2900);
			$(".carR6").find("img").delay(3500).animate({ left : "850px"}, 3000);
			$(".carR6").find(".carLine").delay(3500).animate({ width : "990px"}, 2900);
			*/
			
			$(".carR").each(function(idx) {
				$(this).find("img").stop().delay((idx * 500)+1000).animate({ left : "840px"}, 3000);
				$(this).find(".carLine").stop().delay((idx * 500)+1000).animate({ width : "990px"}, 2900);
				$(this).find(".carR_name").stop().delay((idx * 500)+3500).fadeIn(2000);
			});
			
			open = 1;
			
		} else {   // open값이 1일 경우 왼쪽 사이드 메뉴를 숨긴다.
			$(this).parent().stop(true).animate({ left : "-1000px"}, 800, "easeOutBounce");
			
			$(".carR").stop().find("img").animate({ left : "-130px"}, 0);
			$(".carLine").stop().animate({ width : "10px"}, 0);
			
			$(".img_box").stop().fadeOut(10);
			$(".slideBtn").fadeOut(10);
			
			$(".carR_name").stop().fadeOut(0);
			$(".carR_name").css("text-shadow", "");
			$(".carModelName").html("");
			open = 0;
		}
	});
	
	// carR요소의 자식요소인 자동차 이미지를 클릭하면 이미지 슬라이드 파트 변경
	let carSlideIdx;  // carR요소의 인덱스번호 값을 담을 변수
	$(".carR").find("img").click(function() {
		carSlideIdx = $(this).parent().index();
		let carName = $(this).next(".carR_name").text();

		$(".carModelName").html("&#8810; " + carName + " &#8811;");
		
		$(".img_box").eq(carSlideIdx).siblings("ul").stop().fadeOut(0);
		$(".img_box").eq(carSlideIdx).stop().fadeIn(500);
		$(".slideBtn").fadeIn(500);
		$(this).parent().siblings().find(".carR_name").css("text-shadow", "");
		$(this).next(".carR_name").css({ textShadow : "0 0 10px #fc0"});
		
		// 이미지 슬라이드
		let slideIndex = 1 + (carSlideIdx * 5);         // 처음에 첫번째 이미지를 보여주기위해 1을 할당
		showSlides(slideIndex);   //slideIndex값에 해당하는 이미지로 슬라이드하는 험수

		function plusSlides(n) {  // 다음, 이전버튼을 클릭했을때 호출되는 함수
		  showSlides(slideIndex += n);
		}

		function showSlides(n) {
			let slidesLeng = $(".img_box").eq(carSlideIdx).find("li").length;   // 슬라이드용 이미지의 총 개수

			if (n > slidesLeng) {  // 이미지의 총 개수보다 n값이 클 경우
				slideIndex = 1    // slideIndex에 1을 할당하여 첫번째 이미지를 보여준다.
			}
			if (n < 1) {  // n이 1보다 작을 경우
				slideIndex = slidesLeng   // 이미지의 총 개수값을 할당하여 마지막 이미지를 보여준다.
			}
			
			$(".img_box").eq(carSlideIdx).find("li").stop().fadeOut();
			$(".img_box").eq(carSlideIdx).find("li").eq(slideIndex-1).stop().fadeIn();

		}
		
		$(".prev").click(function() {  // 이전버튼 클릭할 경우
			plusSlides(-1);      // plusSlides함수에 -1을 전달
		});
		$(".next").click(function() {  // 다음버튼 클릭할 경우
			plusSlides(1);      // plusSlides함수에 1을 전달
		});
		
		/*
		// 자동 이미지 슬라이드
		let interval = setInterval( () => {
			showSlides(slideIndex);
			slideIndex++;
		}, 3000);
		*/
	});
	
});