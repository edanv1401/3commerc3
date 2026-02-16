export default function SketchfabViewer({ modelId }) {
    return (
        <div className="sketchfab-embed-wrapper w-full h-full">
            <iframe
                title="Sketchfab Viewer"
                frameBorder="0"
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; vr"
                xr-spatial-tracking="true"
                execution-while-out-of-viewport="true"
                execution-while-not-rendered="true"
                web-share="true"
                src={`https://sketchfab.com/models/${modelId}/embed?api_version=1.12.1&api_id=2&annotations_visible=0&autostart=1&camera=0&ui_controls=0&ui_infos=0&ui_inspector=0&ui_loading=0&ui_stop=0&ui_watermark=0&ui_fullscreen=0&ui_help=0&ui_settings=0&ui_sound=0&ui_start=0&ui_hint=0&ui_vr=0&ui_watermark_link=0&ui_ar=0&ui_ar_help=0&ui_ar_qrcode=0&animation_autoplay=0&dnt=1&scrollwheel=0`}
                className="w-full h-full rounded-lg"
            ></iframe>
        </div>
    );
}
