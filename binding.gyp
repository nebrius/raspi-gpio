{
  "targets": [{
    "target_name": "addon",
    "sources": [
      "src-native/addon.cc",
      "src-native/init.cc",
      "src-native/write.cc",
      "src-native/read.cc"
    ],
    "include_dirs": [
      "<!(node -e \"require('nan')\")"
    ],
    "link_settings": {
      "libraries": [
        "-lwiringPi"
      ]
    }
  }]
}
