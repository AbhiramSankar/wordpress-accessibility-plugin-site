<?php

class WPAccessibilityInit
{
    //Function to run on class call with the parameters that are passed
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue']);
        add_action('wp_body_open', array($this, 'run'));
        add_action('admin_footer', array($this, 'run'));
    }

    //Function for run the front-end
    public function run()
    {
        $adminClass = '';
        if (is_admin()) {
            $adminClass = 'admin-style';
        }
        echo '<div class="accessibility-controls ' . $adminClass . '">
                <div id="accessibility-menu" class="accessibility-menu">
                    <div class="font-size-control">
                        <div class="head"><strong>Change Relative Font Size</strong></div>
                        <div class="control">
                            <button class="minus" aria-label="decrease-font-size">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#007acc" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                            </button>
                            <span> 0 </span>
                            <button class="plus" aria-label="increase-font-size">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#007acc" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                            </button>
                        </div>
                    </div>
                    <div class="color-control">
                        <div class="head"><strong>Change Color Mode and Contrast</strong></div>
                        <div class="options">
                            <div id="color-blind-wrapper">
                                <span>Color Mode</span>
                                <select name="color-blind-filters" id="color-blind-filters">
                                    <option value="none">None</option>
                                    <option value="protanopia">Protanopia</option>
                                    <option value="deuteranopia">Deuteranopia</option>
                                    <option value="tritanopia">Tritanopia</option>
                                    <option value="protanomaly">Protanomaly</option>
                                    <option value="deuteranomaly">Deuteranomaly</option>
                                    <option value="tritanomaly">Tritanomaly</option>
                                    <option value="achromatopsia">Achromatopsia (Grayscale)</option>
                                    <option value="achromatomaly">Achromatomaly</option>
                                </select>
                            </div>
                           <!--<div>
                                <span>None</span>
                                <input type="radio" id="normal" name="color-mode"/>
                            </div>
                            <div>
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
                            </div>
                            <div>
                                <span>Protanomaly</span>
                                <input type="radio" id="protanomaly" name="color-mode"/>
                            </div>
                            <div>
                                <span>Deuteranomaly</span>
                                <input type="radio" id="deuteranomaly" name="color-mode"/>
                            </div>
                            <div>
                                <span>Tritanomaly</span>
                                <input type="radio" id="tritanomaly" name="color-mode"/>
                            </div>
                            <div>
                                <span>Achromatopsia (Grayscale)</span>
                                <input type="radio" id="tritanomaly" name="color-mode"/>
                            </div>
                            <div>
                                <span>Achromatomaly</span>
                                <input type="radio" id="tritanomaly" name="color-mode"/>
                            </div>
                            <div>
                                <span>Grayscale</span>
                                <input type="range" id="grayscale" name="color-mode" value="0"/>
                            </div>
                            <div>
                                <span>Sepia</span>
                                <input type="range" id="sepia" name="color-mode" value="0"/>
                            </div>-->
                            <div class="contrast-control">
                                <span>Contrast</span>
                                <input type="range" id="contrast" name="color-mode" value="0"/>
                            </div>
                            <button class="reset">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M386.3 160L336 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/></svg>    
                                <span>Reset</span>
                            </button>
                        </div>
                    </div>
                    <div class="text-to-speech-control">
                        <div class="tts-toggle head">
                            <div><strong>Enable TTS</strong></div>
                            <input type="checkbox" name="tts" id="tts"/>
                        </div>
                        <div class="tts-options">
                            <div id="tts-voice-wrapper">
                                <span>Voice</span>
                                <select name="tss-voice" id="tss-voice">
                                </select>
                            </div>
                            <div>
                                <span>Speed</span>
                                <input type="range" id="speed" min="0.1" max="2" name="tss-option" step="0.01" value="1"/>
                            </div>
                            <div>
                                <span>Pitch</span>
                                <input type="range" id="pitch" min="0.1" max="2" name="tss-option" step="0.01" value="1"/>
                            </div>
                            <button class="reset">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M386.3 160L336 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/></svg>    
                                <span>Reset</span>
                            </button>
                        </div>
                    </div>
                </div>
                <button id="accessibility-button" class="accessibility-button" aria-label="accessibility-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm161.5-86.1c-12.2-5.2-26.3 .4-31.5 12.6s.4 26.3 12.6 31.5l11.9 5.1c17.3 7.4 35.2 12.9 53.6 16.3l0 50.1c0 4.3-.7 8.6-2.1 12.6l-28.7 86.1c-4.2 12.6 2.6 26.2 15.2 30.4s26.2-2.6 30.4-15.2l24.4-73.2c1.3-3.8 4.8-6.4 8.8-6.4s7.6 2.6 8.8 6.4l24.4 73.2c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-28.7-86.1c-1.4-4.1-2.1-8.3-2.1-12.6l0-50.1c18.4-3.5 36.3-8.9 53.6-16.3l11.9-5.1c12.2-5.2 17.8-19.3 12.6-31.5s-19.3-17.8-31.5-12.6L338.7 175c-26.1 11.2-54.2 17-82.7 17s-56.5-5.8-82.7-17l-11.9-5.1zM256 160a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                </button>
            </div>';
    }

    // Enqueue CSS and JavaScript
    public function enqueue()
    {
        wp_enqueue_style('accessibility-style', PLUGIN_URL . '/assets/css/style.css');
        wp_enqueue_style('select2-style', PLUGIN_URL . '/assets/css/select2.min.css');
        wp_enqueue_script('accessibility-script', PLUGIN_URL . '/assets/js/script.js', array('jquery'), null, true);
        wp_enqueue_script('select2-script', PLUGIN_URL . '/assets/js/select2.min.js', array('jquery'), null, true);
        // wp_enqueue_script('articulate-script', PLUGIN_URL . '/assets/js/articulate.min.js', array('jquery'), null, true);
    }
}

?>