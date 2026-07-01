GA_SNIPPET = """<!-- Google Analytics ID here -->"""

def inject_analytics(html:str, measurement_id:str=""):
    if not measurement_id:
        return html
    snippet=f"""<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={measurement_id}"></script>
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){{dataLayer.push(arguments);}}
gtag('js', new Date());
gtag('config','%s');
</script>""" % measurement_id
    return html.replace("</head>", snippet+"\n</head>")
