from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SAMPLE = ROOT / "prototype" / "dashboard-sample"

html_path = SAMPLE / "index.html"
css_path = SAMPLE / "styles.css"
js_path = SAMPLE / "app.js"
preview_path = SAMPLE / "preview.html"

html = html_path.read_text(encoding="utf-8")
css = css_path.read_text(encoding="utf-8")
js = js_path.read_text(encoding="utf-8")

style_tag = '<link rel="stylesheet" href="./styles.css" />'
script_tag = '<script src="./app.js"></script>'

if style_tag not in html:
    raise RuntimeError(f"Expected stylesheet tag not found in {html_path}")

if script_tag not in html:
    raise RuntimeError(f"Expected script tag not found in {html_path}")

preview = html.replace(
    style_tag,
    f"<style>\n{css}\n</style>",
).replace(
    script_tag,
    f"<script>\n{js}\n</script>",
)

preview_path.write_text(preview, encoding="utf-8")
print(f"Built {preview_path.relative_to(ROOT)}")
