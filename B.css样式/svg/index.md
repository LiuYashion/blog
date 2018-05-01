矩形 <rect>
圆形 <circle>
椭圆 <ellipse>
线 <line>
折线 <polyline>
多边形 <polygon>
路径 <path>
组 <g>


矩形 <rect>
<rect> 标签用于创建 矩形 和 圆角矩形
（x，y）是矩形左上角坐标，默认是（0，0）
（width，height）是矩形的宽度和高度
（rx，ry）是矩形圆角的水平半径和垂直半径
<svg xmlns="http://www.w3.org/2000/svg">
    <!-- 普通矩形 -->
    <rect x="10" y="20" width="100" height="50" style="fill:red;stroke:black;stroke-width:2;" />
    <!-- 圆角矩形 -->
    <rect x="150" y="20" width="100" height="50" rx="10" ry="10" style="fill:red;stroke:black;stroke-width:2;" />
</svg>




椭圆 <ellipse>
<ellipse> 标签用于创建一个椭圆
（cx，cy）是椭圆中心点的坐标，默认是（0，0）
（rx，ry）是水平半径和垂直半径
<svg xmlns="http://www.w3.org/2000/svg">
    <!-- 普通椭圆 -->
    <ellipse cx="100" cy="50" rx="80" ry="40" stroke="black" stroke-width="2" fill="red" />
    <!-- 两个椭圆叠成圆环 -->
    <ellipse cx="300" cy="50" rx="80" ry="40" stroke="black" stroke-width="2" fill="red" />
    <ellipse cx="300" cy="50" rx="70" ry="30" stroke="black" stroke-width="2" fill="white" />
</svg> 




圆形 <circle>
<circle> 标签用于创建一个圆
（cx，cy）是圆心坐标，默认是（0，0）
r 是圆的半径
<svg xmlns="http://www.w3.org/2000/svg">
    <!-- 普通圆形 -->
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
    <!-- 两个圆形叠成的圆环 -->
    <circle cx="150" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
    <circle cx="150" cy="50" r="30" stroke="black" stroke-width="2" fill="white" />
</svg> 


线 <line>
<line> 标签用于创建一个线条
（x1，y1）是线条的起始坐标，默认是（0，0）
（x2，y2）是线条的终止坐标，默认是（0，0）
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <line x1="30" y1="10"  x2="100" y2="100" style="stroke:rgb(255,0,0);stroke-width:2" />
</svg>




折线 <polyline>
<polyline> 标签用于创建任何只有直线的形状
points 属性定义折线每个点的坐标（x，y），用空格分隔每个点。points的定义形式有两种： 
points=”x1,y1 x2,y2 ……”
points=”x1 y1 x2 y2 ……”
fill 属性和多边形的fill是一样的，填充的是首尾相连后的形状的内容
<html>
    <body>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200">
            <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" style="fill:white;stroke:red;stroke-width:4" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200">
            <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160 160,160" style="fill:yellow;stroke:red;stroke-width:4" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200">
            <polygon points="0,40 40,40 40,80 80,80 80,120 120,120 120,160 160,160" style="fill:yellow;stroke:red;stroke-width:4" />
        </svg>
    </body>
</html>



多边形 <polygon>
<polygon> 标签用来创建含有不少于三个边的图形。多边形是由直线组成，其形状是”封闭”的（所有的线条 连接起来）。
points 属性定义折线每个点的坐标（x，y），用空格分隔每个点，头尾自动相连。points的定义形式有两种： 
points=”x1,y1 x2,y2 ……”
points=”x1 y1 x2 y2 ……”
fill 属性和折线的fill是一样的，填充的是首尾相连后的形状的内容
<html>
    <body>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200">
            <polygon points="100,10 40,180 190,60 10,60 160,180" style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200">
            <polygon points="100,10 40,180 190,60 10,60 160,180" style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;"/>
        </svg>
    </body>
</html>




路径 <path>
<path> 标签用于定义一个路径。
d用来定义每个关键点的路径数据
以下标记用来修饰路径数据，所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。 
M = moveto(M X,Y) ：将画笔移动到指定的坐标位置
L = lineto(L X,Y) ：画直线到指定的坐标位置
H = horizontal lineto(H X)：画水平线到指定的X坐标位置
V = vertical lineto(V Y)：画垂直线到指定的Y坐标位置
C = curveto(C X1,Y1,X2,Y2,ENDX,ENDY)：三次贝赛曲线
S = smooth curveto(S X2,Y2,ENDX,ENDY)
Q = quadratic Bézier curve(Q X,Y,ENDX,ENDY)：二次贝赛曲线
T = smooth quadratic Bézier curveto(T ENDX,ENDY)
A = elliptical Arc(A RX,RY,XROTATION,FLAG1,FLAG2,X,Y)：弧线
Z = closepath(Z)：关闭路径
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width:600px;height:300px">
    <path id="lineAB" d="M 100 350 l 150 -300" stroke="red" stroke-width="3" fill="none" />
    <path id="lineBC" d="M 250 50 l 150 300" stroke="red" stroke-width="3" fill="none" />
    <path d="M 175 200 l 150 0" stroke="green" stroke-width="3" fill="none" />
    <path d="M 100 350 q 150 -300 300 0" stroke="blue" stroke-width="5" fill="none" />
    <!-- Mark relevant points -->
    <g stroke="black" stroke-width="3" fill="black">
        <circle id="pointA" cx="100" cy="350" r="3" />
        <circle id="pointB" cx="250" cy="50" r="3" />
        <circle id="pointC" cx="400" cy="350" r="3" />
    </g>
    <!-- Label the points -->
    <g font-size="30" font="sans-serif" fill="black" stroke="none" text-anchor="middle">
        <text x="100" y="350" dx="-30">A</text>
        <text x="250" y="50" dy="-10">B</text>
        <text x="400" y="350" dx="30">C</text>
    </g>
</svg>





组<g>
<g> 标签是用于把所有相关元素进行组合的容器元素，在<g>
id 用来设置该组的名称
fill 用来设置该组所有成员的默认填充颜色
opacity 用来设置该组所有成员的默认不透明度
共有属性
style 用来设置 CSS 属性
fill 用来设置矩形的填充颜色（rgb 值、颜色名或者十六进制值）
stroke 用来设置矩形边框的颜色
stroke-width 用来设置矩形边框的宽度
fill-opacity 用来设置填充颜色透明度（范围：0 - 1）
stroke-opacity 用来设置笔触（边框）颜色的透明度（范围：0 - 1）
opacity 用来设置元素整体（包括”填充”和”边框”）的透明值（范围: 0 到 1）