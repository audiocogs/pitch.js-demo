# Pitch detection demo

This shows a possible use of [pitch.js](https://github.com/audiocogs/pitch.js)


## Getting the code

This demo references its dependencies as git submodules. Get the code and all submodules in one go:

    git clone --recursive https://github.com/audiocogs/pitch.js-demo

If you have already cloned the repository without the `--recursive` option you also need to update the submodules

    git submodule init
    git submodule update


## Running the demo

Browsers put restrictions on `file://` and the demo will not work if you open the file directly. You need to set up a web server on your machine.

If you have Python 3 installed, run the following from the repository's directory:

    python -m http.server

Or, with Python 2:

    python -m SimpleHTTPServer

The demo will be available at <http://localhost:8000/ui.html>. Allow microphone access in the flash settings dialog that appears. The browser itself might ask for confirmation (Chrome does that), allow microphone access again.

Try singing something! You should see the frequency change. If nothing happens, you're not singing loud enough — connect an external microphone or get closer to the one integrated in your computer.

