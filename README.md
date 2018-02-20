## about:flags

![Screenshot][screenshot]

Chrome/Opera like UI for easily enabling experimental browser features.

### Build instructions

1. If you haven't done so already, clone the main repository.
   * ``git clone https://github.com/Anima-OS/Quokka.git``
2. ``cd`` into [Quokka/browser/components][components directory].
3. Add the ``aboutflags`` submodule.
   * ``git submodule add https://github.com/Anima-OS/aboutFlags.git aboutflags``
4. Add the new component's folder name to the ``DIRS += [`` array inside the
   components' root [moz.build][components moz.build].
   * Mind the alphabetical order!
5. ``cd`` into the Quokka source tree's root directory and build the project.
   * ``mach build``
6. After a successful build (🎉Congratulations🎉), boot up Quokka.
   * ``mach run``
7. Visit ``about:flags``.
8. Profit(?)


[screenshot]: screenshot.png

[components directory]: https://github.com/Anima-OS/Quokka/tree/master/browser/components

[components moz.build]: https://github.com/Anima-OS/Quokka/blob/master/browser/components/moz.build#L29