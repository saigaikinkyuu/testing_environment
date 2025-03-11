const setting_page_button_style = document.getElementById("style_button");
const setting_page_button_score = document.getElementById("score_button");
const setting_page_button_submit = document.getElementById("submit_button");
const setting_page_content_style = document.getElementById("style_st");
const setting_page_content_score = document.getElementById("score_st");
const score_input_1 = document.getElementById("box1_in_va");
const score_input_2 = document.getElementById("box2_in_va");
const score_input_3 = document.getElementById("box3_in_va");
const score_input_1_ex = document.getElementById("box1_in_ex");
const score_input_2_ex = document.getElementById("box2_in_ex");
const score_input_3_ex = document.getElementById("box3_in_ex");
const score_box_total = document.getElementById("total_num")
const score_box_1_num = document.getElementById("box_score_1");
const score_box_2_num = document.getElementById("box_score_2");
const score_box_3_num = document.getElementById("box_score_3");
const score_box_total_num = document.getElementById("box_score_total");
const input_box_ttl_1 = document.getElementById("input_box_ttl_1");
const input_box_ttl_2 = document.getElementById("input_box_ttl_2");
const input_box_ttl_3 = document.getElementById("input_box_ttl_3");
const key_code_button = document.getElementById("coppy_button");
const total_need_checkBox = document.getElementById("box_total_need_check");

let style_key_code = "Null";
let key_code_flag = false;

setting_page_button_score.addEventListener("click",(event) => {
    event.preventDefault();
    setting_page_content_score.style.display = "block"
    setting_page_content_style.style.display = "none"
})

setting_page_button_style.addEventListener("click",(event) => {
    event.preventDefault();
    setting_page_content_style.style.display = "block"
    setting_page_content_score.style.display = "none"
})

setting_page_button_submit.addEventListener("click",(event) => {
    event.preventDefault();
    const box_nor = document.querySelectorAll(".box");
    const box_ttl_nor = document.querySelectorAll(".box_ttl");
    const box_num_nor = document.querySelectorAll(".box_num");
    const box_total = document.querySelectorAll(".total");
    const box_ttl_total = document.querySelectorAll(".total_ttl");
    const box_num_total = document.querySelectorAll(".total_num");

    const input_nor_box = document.getElementById("box_in_co_box").value;
    const input_nor_ttl_text = document.getElementById("box_in_co_ttl_te").value;
    const input_nor_ttl_back = document.getElementById("box_in_co_ttl_ba").value;
    const input_nor_score_text = document.getElementById("box_in_co_sc_te").value;
    const input_nor_score_back = document.getElementById("box_in_co_sc_ba").value;
    const input_total_box = document.getElementById("total_in_co_box").value;
    const input_total_ttl_text = document.getElementById("total_in_co_ttl_te").value;
    const input_total_ttl_back = document.getElementById("total_in_co_ttl_ba").value;
    const input_total_score_text = document.getElementById("total_in_co_sc_te").value;
    const input_total_score_back = document.getElementById("total_in_co_sc_ba").value;
    let input_length_box = Number(document.getElementById("box_length").value);

    const array_colors_style = [input_nor_box,input_nor_ttl_text,input_nor_ttl_back,input_nor_score_text,input_nor_score_back,input_total_box,input_total_ttl_text,input_total_ttl_back,input_total_score_text,input_total_score_back];
    let keyCode = "";

    document.getElementById("box1").style.display = "none"
    document.getElementById("box2").style.display = "none"
    document.getElementById("box3").style.display = "none"
    if(!input_length_box){
        document.getElementById("box_length").value = 1
        input_length_box = 1
    }
    if(input_length_box === 1){
        document.getElementById("total").style.display = "none"
    }else{
        document.getElementById("total").style.display = "block"
    }
    for(let i = 0;i < input_length_box;i++){
        document.getElementById("box" + (i + 1)).style.display = "block"
    }
    box_nor.forEach(element => {
        if(input_nor_box){
            element.style.backgroundColor = input_nor_box;
        }
    });
    box_ttl_nor.forEach(element => {
        if(input_nor_ttl_back){
            element.style.backgroundColor = input_nor_ttl_back;
        }
        if(input_nor_ttl_text){
            element.style.color = input_nor_ttl_text;
        }
    });
    box_num_nor.forEach(element => {
        if(input_nor_score_back){
            element.style.backgroundColor = input_nor_score_back;
        }
        if(input_nor_score_text){
            element.style.color = input_nor_score_text;
        }
    });
    box_total.forEach(element => {
        if(input_total_box){
            element.style.backgroundColor = input_total_box;
        }
    });
    box_ttl_total.forEach(element => {
        if(input_total_ttl_back){
            element.style.backgroundColor = input_total_ttl_back;
        }
        if(input_total_ttl_text){
            element.style.color = input_total_ttl_text;
        }
    });
    box_num_total.forEach(element => {
        if(input_total_ttl_back){
            element.style.backgroundColor = input_total_score_back;
        }
        if(input_total_ttl_text){
            element.style.color = input_total_score_text;
        }
    });

    for(let i = 0;i < array_colors_style.length;i++){
        if(array_colors_style[i]){
            if((array_colors_style[i]).includes("#")){
                let color_rgb = hexToRgb(array_colors_style[i])
                if(color_rgb[0] !== "No"){
                    keyCode += color_rgb[0] + color_rgb[1] + color_rgb[2] + "."
                }else {
                    keyCode += "No."
                }
            }
        }
    }
    style_key_code = keyCode;
    document.getElementById("coppy_area").value = style_key_code
})

score_input_1.addEventListener("change",() => {
    if(!score_input_1_ex){
        score_input_1_ex.value = 1
    }
    if(!score_input_2_ex){
        score_input_2_ex.value = 1
    }
    if(!score_input_3_ex){
        score_input_3_ex.value = 1
    }
    score_box_1_num.textContent = score_input_1.value
    score_box_total_num.textContent = score_input_1.value * score_input_1_ex.value + score_input_2.value * score_input_2_ex.value + score_input_3.value * score_input_3_ex.value
})

score_input_2.addEventListener("change",() => {
    if(!score_input_1_ex){
        score_input_1_ex.value = 1
    }
    if(!score_input_2_ex){
        score_input_2_ex.value = 1
    }
    if(!score_input_3_ex){
        score_input_3_ex.value = 1
    }
    score_box_2_num.textContent = score_input_2.value
    score_box_total_num.textContent = score_input_1.value * score_input_1_ex.value + score_input_2.value * score_input_2_ex.value + score_input_3.value * score_input_3_ex.value
})

score_input_3.addEventListener("change",() => {
    if(!score_input_1_ex){
        score_input_1_ex.value = 1
    }
    if(!score_input_2_ex){
        score_input_2_ex.value = 1
    }
    if(!score_input_3_ex){
        score_input_3_ex.value = 1
    }
    score_box_3_num.textContent = score_input_1.value
    score_box_total_num.textContent = score_input_3.value * score_input_1_ex.value + score_input_2.value * score_input_2_ex.value + score_input_3.value * score_input_3_ex.value
})

score_input_1_ex.addEventListener("change",() => {
    score_box_total_num.textContent = score_input_1.value * score_input_1_ex.value + score_input_2.value * score_input_2_ex.value + score_input_3.value * score_input_3_ex.value
})

score_input_2_ex.addEventListener("change",() => {
    score_box_total_num.textContent = score_input_1.value * score_input_1_ex.value + score_input_2.value * score_input_2_ex.value + score_input_3.value * score_input_3_ex.value
})

score_input_3_ex.addEventListener("change",() => {
    score_box_total_num.textContent = score_input_1.value * score_input_1_ex.value + score_input_2.value * score_input_2_ex.value + score_input_3.value * score_input_3_ex.value
})

input_box_ttl_1.addEventListener("change",() => {
    if(!input_box_ttl_1.value){
        document.getElementById("box_ttl_1").style.display = "none"
    }else{
        document.getElementById("box_ttl_1").style.display = "block"
        document.getElementById("box_ttl_1").textContent = input_box_ttl_1.value
    }
})

input_box_ttl_2.addEventListener("change",() => {
    if(!input_box_ttl_2.value){
        document.getElementById("box_ttl_2").style.display = "none"
    }else{
        document.getElementById("box_ttl_2").style.display = "block"
        document.getElementById("box_ttl_2").textContent = input_box_ttl_2.value
    }
})

input_box_ttl_3.addEventListener("change",() => {
    if(!input_box_ttl_3.value){
        document.getElementById("box_ttl_3").style.display = "none"
    }else{
        document.getElementById("box_ttl_3").style.display = "block"
        document.getElementById("box_ttl_3").textContent = input_box_ttl_3.value
    }
})

function hexToRgb(hex) {
    try{
        // "#" を削除
        hex = hex.replace('#', '');
  
        // 16進数を10進数に変換
        const r = ("00" + (parseInt(hex.substring(0, 2), 16))).slice(-3);
        const g = ("00" + (parseInt(hex.substring(2, 4), 16))).slice(-3);
        const b = ("00" + (parseInt(hex.substring(4, 6), 16))).slice(-3);
  
        // RGBカラーコードを返す
        return [r,g,b];
    }catch(e){
        console.log(e)
        return ["No","No","No"]
    }
}

function keyCodeToHex(keycode) {
    try{
        const array = keycode.split(".");
        let color_array = []
        for(let i = 0;i<array.length;i++){
            const r = Number((array[i]).slice(0,3));
            const g = Number((array[i]).slice(3,6));
            const b = Number((array[i]).slice(6,9));
            const hexR = r.toString(16).padStart(2, '0');
            const hexG = g.toString(16).padStart(2, '0');
            const hexB = b.toString(16).padStart(2, '0');
            color_array.push("#" + hexR + "" + hexG + "" + hexB)
        }
  
        // RGBカラーコードを返す
        return color_array;
    }catch(e){
        console.log(e)
        return ["No"]
    }
}

total_need_checkBox.addEventListener("change",() => {
    if(total_need_checkBox.checked){
        document.getElementById("total").style.display = "block";
    }else {
        document.getElementById("total").style.display = "none";
    }
})

/*key_code_button.addEventListener("click",(event) => {
    event.preventDefault();
    if(key_code_flag) return
    navigator.clipboard.writeText(style_key_code)
    .then(() => {
        key_code_flag = true;
        key_code_button.textContent = "コピーしました"
        key_code_button.style.border = "3px dashed white"
        setTimeout(() => {
            key_code_flag = false;
            key_code_button.textContent = "コピーする"
            key_code_button.style.border = "3px solid white"
        },10000)
    })
    .catch(err => {
        console.error('文字列のコピーに失敗しました:', err);
    });
})*/

window.onload = function() {
    total_need_checkBox.checked = true
    fetch('./setting.json')
    .then(response => response.json())
    .then(data => {
        //TITLE
        if(data.box.box1.ttl){
            document.getElementById("box_ttl_1").textContent = data.box.box1.ttl
        }
        if(data.box.box2.ttl){
            document.getElementById("box_ttl_2").textContent = data.box.box2.ttl
        }
        if(data.box.box3.ttl){
            document.getElementById("box_ttl_3").textContent = data.box.box3.ttl
        }

        //DEFO SCORE
        if(data.box.box1.num && typeof data.box.box1.exchange === "number"){
            document.getElementById("box1_in_va").value = data.box.box1.num
            document.getElementById("box_score_1").textContent = data.box.box1.num
        }
        if(data.box.box2.num && typeof data.box.box1.exchange === "number"){
            document.getElementById("box2_in_va").value = data.box.box2.num
            document.getElementById("box_score_2").textContent = data.box.box2.num
        }
        if(data.box.box3.num && typeof data.box.box1.exchange === "number"){
            document.getElementById("box3_in_va").value = data.box.box3.num
            document.getElementById("box_score_3").textContent = data.box.box3.num
        }

        //EXHANGE
        if(data.box.box1.exchange && typeof data.box.box1.exchange === "number"){
            document.getElementById("input_box_ttl_1").value = data.box.box1.exchange
        }
        if(data.box.box2.exchange && typeof data.box.box1.exchange === "number"){
            document.getElementById("input_box_ttl_2").value = data.box.box2.exchange
        }
        if(data.box.box3.exchange && typeof data.box.box1.exchange === "number"){
            document.getElementById("input_box_ttl_3").value = data.box.box3.exchange
        }

        //TOTAL
        if(typeof data.box.total.exchange === "boolean"){
            total_need_checkBox.checked = data.box.total.display
        }

        //COLOR KEY
        if(data.style.key){
            keyCodeToHex(data.style.key)
        }else {
            document.getElementById("box_in_co_box").value = data.style.normal.box.color;
            document.getElementById("box_in_co_ttl_te").value = data.style.normal.ttl.color1;
            document.getElementById("box_in_co_ttl_ba").value = data.style.normal.ttl.color2;
            document.getElementById("box_in_co_sc_te").value = data.style.normal.score.color1;
            document.getElementById("box_in_co_sc_ba").value = data.style.normal.score.color2;
            document.getElementById("total_in_co_box").value = data.style.total.box.color;
            document.getElementById("total_in_co_ttl_te").value = data.style.total.ttl.color1;
            document.getElementById("total_in_co_ttl_ba").value = data.style.total.ttl.color2;
            document.getElementById("total_in_co_sc_te").value = data.style.total.score.color1;
            document.getElementById("total_in_co_sc_ba").value = data.style.total.score.color2;
        }
        let keyCode = ""
        const input_nor_box = document.getElementById("box_in_co_box").value;
        const input_nor_ttl_text = document.getElementById("box_in_co_ttl_te").value;
        const input_nor_ttl_back = document.getElementById("box_in_co_ttl_ba").value;
        const input_nor_score_text = document.getElementById("box_in_co_sc_te").value;
        const input_nor_score_back = document.getElementById("box_in_co_sc_ba").value;
        const input_total_box = document.getElementById("total_in_co_box").value;
        const input_total_ttl_text = document.getElementById("total_in_co_ttl_te").value;
        const input_total_ttl_back = document.getElementById("total_in_co_ttl_ba").value;
        const input_total_score_text = document.getElementById("total_in_co_sc_te").value;
        const input_total_score_back = document.getElementById("total_in_co_sc_ba").value;

        const array_colors_style = [input_nor_box,input_nor_ttl_text,input_nor_ttl_back,input_nor_score_text,input_nor_score_back,input_total_box,input_total_ttl_text,input_total_ttl_back,input_total_score_text,input_total_score_back];
        for(let i = 0;i < array_colors_style.length;i++){
            if(array_colors_style[i]){
                if((array_colors_style[i]).includes("#")){
                    let color_rgb = hexToRgb(array_colors_style[i])
                    if(color_rgb[0] !== "No"){
                        keyCode += color_rgb[0] + color_rgb[1] + color_rgb[2] + "."
                    }else {
                        keyCode += "No."
                    }
                }
            }
        }
        style_key_code = keyCode;
        document.getElementById("coppy_area").value = style_key_code
    })
}