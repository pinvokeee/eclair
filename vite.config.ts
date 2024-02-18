import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const noAttr = () => {
    return {
        name: "no-attribute",
        apply: 'build',
        transformIndexHtml(html: string) {
            const scriptTagIndex = html.indexOf(`<script type="module"`);
            const scriptTagEnd = html.indexOf("</script>", scriptTagIndex) + "</script>".length;
            const scriptTag = html.substring(scriptTagIndex, scriptTagEnd);
            const rootTag = `<div id="root"></div>`;
            const html2 = html.replace(scriptTag, "").replace(rootTag, `${rootTag}\n    ${scriptTag}`).replace(`type="module"`, "").replace(/crossorigin/g, "");
            return html2;
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), noAttr()],
    base: "./",
    build: {
        
    }
})
