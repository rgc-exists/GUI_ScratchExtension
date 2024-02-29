const ImGui = require("imgui-js");
const ImGui_Impl = require("./imgui_impl");

class AdvancedUI {
    constructor(runtime) {
        this.runtime = runtime
        this.currentMSecs = -1
        this.imguiContext = -1
        this.canvas = document.getElementById('scratch-stage');
    }
    
    getInfo() {
        return {
            "id": "AdvancedUI",
            "name": "AdvancedUI",
            "blocks": [{
                        "opcode": "InitIMGui",
                        "blockType": "command",
                        "text": "Initialize IMGui",
                        "arguments": {
                        },
                    },
            ],
            "menus": {
            }
        };
    }
    
    update() {
        if (this.runtime.currentMSecs == this.currentMSecs) 
            return // not a new polling cycle
        this.currentMSecs = this.runtime.currentMSecs
        
    }
    
    InitIMGui({}) {
        ImGui_Impl.Init(this.canvas)
        this.update()
        return false
    }

    TestUI({}){
        ImGui_Impl.NewFrame(time);
        // 1. Show a simple window
        // Tip: if we don't call ImGui::Begin()/ImGui::End() the widgets automatically appears in a window called "Debug".
        {
            // static float f = 0.0f;
            ImGui.Text("Hello, world!"); // Some text (you can use a format string too)
            ImGui.SliderFloat("float", (value = f) => f = value, 0.0, 1.0); // Edit 1 float as a slider from 0.0f to 1.0f
            ImGui.ColorEdit3("clear color", clear_color); // Edit 3 floats as a color
            if (ImGui.Button("Demo Window"))
                show_demo_window = !show_demo_window;
            if (ImGui.Button("Another Window"))
                show_another_window = !show_another_window;
            ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);
            if (ImGui.Button("Memory Editor"))
                memory_editor.Open = !memory_editor.Open;
            if (memory_editor.Open)
                memory_editor.DrawWindow("Memory Editor", bindImGui.buffer);
            const mi = bindImGui.mallinfo();
            // ImGui.Text(`Total non-mmapped bytes (arena):       ${mi.arena}`);
            // ImGui.Text(`# of free chunks (ordblks):            ${mi.ordblks}`);
            // ImGui.Text(`# of free fastbin blocks (smblks):     ${mi.smblks}`);
            // ImGui.Text(`# of mapped regions (hblks):           ${mi.hblks}`);
            // ImGui.Text(`Bytes in mapped regions (hblkhd):      ${mi.hblkhd}`);
            ImGui.Text(`Max. total allocated space (usmblks):  ${mi.usmblks}`);
            // ImGui.Text(`Free bytes held in fastbins (fsmblks): ${mi.fsmblks}`);
            ImGui.Text(`Total allocated space (uordblks):      ${mi.uordblks}`);
            ImGui.Text(`Total free space (fordblks):           ${mi.fordblks}`);
            // ImGui.Text(`Topmost releasable block (keepcost):   ${mi.keepcost}`);
        }
    }
}

(function() {
    var extensionInstance = new AdvancedUI(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()