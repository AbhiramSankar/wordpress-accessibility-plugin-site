<?php

class WPAccessibilityInit
{
    //Function to run on class call with the parameters that are passed
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('wp_body_open', array($this, 'run'));
    }

    //Function for run the front-end
    public function run()
    {
        echo '<div class="accessibility-controls">
                <div id="accessibility-menu" class="accessibility-menu">
                    <div class="font-size-control">
                        <div>Change Relative Font Size</div>
                        <div class="control">
                            <button class="minus">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                            </button>
                            <span> 0 </span>
                            <button class="plus">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                            </button>
                        </div>
                    </div>
                    <div class="color-control">
                        <div>Change Color Mode</div>
                        <div class="options">
                            <div>
                                <span>Normal</span>
                                <input type="radio" id="normal" name="color-mode" checked/>
                            </div>
                            <div>
                                <span>Grayscale</span>
                                <input type="radio" id="grayscale" name="color-mode"/>
                            </div>
                            <!-- <div>
                                <span>Protanopia</span>
                                <input type="radio" id="protanopia" name="color-mode"/>
                            </div>
                            <div>
                                <span>Deuteranopia</span>
                                <input type="radio" id="deuteranopia" name="color-mode"/>
                            </div>
                            <div>
                                <span>Tritanopia</span>
                                <input type="radio" id="tritanopia" name="color-mode"/>
                            </div> -->
                        </div>
                    </div>
                    <div class="text-to-speech-control">
                        <div>Enable TTS</div>
                    </div>
                </div>
                <button id="accessibility-button" class="accessibility-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm161.5-86.1c-12.2-5.2-26.3 .4-31.5 12.6s.4 26.3 12.6 31.5l11.9 5.1c17.3 7.4 35.2 12.9 53.6 16.3l0 50.1c0 4.3-.7 8.6-2.1 12.6l-28.7 86.1c-4.2 12.6 2.6 26.2 15.2 30.4s26.2-2.6 30.4-15.2l24.4-73.2c1.3-3.8 4.8-6.4 8.8-6.4s7.6 2.6 8.8 6.4l24.4 73.2c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-28.7-86.1c-1.4-4.1-2.1-8.3-2.1-12.6l0-50.1c18.4-3.5 36.3-8.9 53.6-16.3l11.9-5.1c12.2-5.2 17.8-19.3 12.6-31.5s-19.3-17.8-31.5-12.6L338.7 175c-26.1 11.2-54.2 17-82.7 17s-56.5-5.8-82.7-17l-11.9-5.1zM256 160a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                </button>
            </div>';
    }

    // Enqueue CSS and JavaScript
    public function enqueue_scripts()
    {
        wp_enqueue_style('accessibility-style', PLUGIN_URL . '/assets/css/style.css');
        wp_enqueue_script('accessibility-script', PLUGIN_URL . '/assets/js/script.js', array('jquery'), null, true);
    }
}

?>