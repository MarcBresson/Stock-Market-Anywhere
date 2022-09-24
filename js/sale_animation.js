let general_style = document.createElement("style")
general_style.innerHTML = `
.animator {
    font-weight: 700;
    position: absolute;
    bottom: 10px;
}
.animator div {
    animation-iteration-count: 1;
}
`
document.getElementsByTagName("html")[0].appendChild(general_style)

function new_sale_animation(colour, price){
    let animation_duration = range(Math.random(), 0, 1, 3, 10)
    let scale = range(parseFloat(price), 0, 5, 0.7, 1.3)

    let animation_name_key = Math.random().toString().slice(2)
    let x_anim = animation_keyframe_creator("x", animation_name_key, 15, 130)
    let y_anim = animation_keyframe_creator("y", animation_name_key, 80, 350)

    // style hosting the animation keyframes
    let animation_style_tag = document.createElement("style")
    animation_style_tag.setAttribute("key", animation_name_key)
    animation_style_tag.innerHTML = x_anim[1] + "\n" + y_anim[1]
    document.getElementsByTagName("html")[0].appendChild(animation_style_tag)

    let animator_el = generate_html_elements(scale, colour, animation_name_key, animation_duration, y_anim[0], x_anim[0])
    document.getElementsByTagName("html")[0].appendChild(animator_el)

    setTimeout(()=>{
        document.querySelectorAll(`[key='${animation_name_key}']`).forEach((el) => el.remove())
    }, animation_duration * 1000)
}

function get_initial_pos(){
    return range(Math.random(), 0, 1, 0, window.innerWidth)
}

function animation_keyframe_creator(axis, animation_name_key, min_distance, max_distance){
    let animation_name
    let keyframes

    switch(axis){
        case 'x':
            animation_name= `animation_x_${animation_name_key}`

            let direction = Math.random() > .5
            let x_distance = range(Math.random(), 0, 1, min_distance, max_distance)
            x_movement = (direction ? 1 : -1)*(x_distance)

            keyframes=`@keyframes ${animation_name} {
                0% {
                    animation-timing-function: ease-in-out;
                    transform: translateX(0px);
                }
                40% {
                    opacity: 1;
                }
                100% {
                    transform: translateX(${x_movement}px) scale(0.4);
                    opacity: 0;
                }
            }`
            break

        case 'y':
            animation_name= `animation_y_${animation_name_key}`

            let y_distance = range(Math.random(), 0, 1, min_distance, max_distance)

            keyframes=`@keyframes ${animation_name} {
                0% {
                    transform: translateY(0px);
                }
                100% {
                    transform: translateY(${-y_distance}px);
                }
            }`
            break
    }

    return [animation_name, keyframes]
}

function generate_html_elements(scale, colour, animation_name_key, animation_duration, y_anim, x_anim){
    let animator_el = document.createElement("div")
    animator_el.setAttribute("key", animation_name_key)
    animator_el.classList.add("animator")
    animator_el.style.left = get_initial_pos() + "px"
    animator_el.style.fontSize = `${scale}em`
    animator_el.style.color = colour

    let animated_y_el = document.createElement("div")
    animated_y_el.style.animationName = y_anim
    animated_y_el.style.animationDuration = animation_duration + "s"

    let animated_x_el = document.createElement("div")
    animated_x_el.style.animationName = x_anim
    animated_x_el.style.animationDuration = animation_duration + "s"

    animated_x_el.innerHTML = "+1"

    animated_y_el.appendChild(animated_x_el)
    animator_el.appendChild(animated_y_el)

    return animator_el
}

function range(val, in_min, in_max, out_min, out_max){
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}
