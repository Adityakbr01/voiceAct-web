"use client";
import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled,
} from "@tabler/icons-react";

const SOUND_DEFINES_DOWN: Record<string, [number, number]> = {
  Escape: [2894, 113],
  F1: [3610, 98],
  F2: [4210, 90],
  F3: [4758, 90],
  F4: [5250, 100],
  F5: [5831, 105],
  F6: [6396, 105],
  F7: [6900, 105],
  F8: [7443, 111],
  F9: [7955, 91],
  F10: [8504, 105],
  F11: [9046, 94],
  F12: [9582, 96],
  Backquote: [12476, 100],
  Digit1: [12946, 96],
  Digit2: [13470, 95],
  Digit3: [13963, 100],
  Digit4: [14481, 102],
  Digit5: [14994, 94],
  Digit6: [15505, 109],
  Digit7: [15990, 97],
  Digit8: [16529, 92],
  Digit9: [17012, 103],
  Digit0: [17550, 87],
  Minus: [18052, 93],
  Equal: [18553, 89],
  Backspace: [19065, 110],
  Tab: [21734, 119],
  KeyQ: [22245, 95],
  KeyW: [22790, 89],
  KeyE: [23317, 83],
  KeyR: [23817, 92],
  KeyT: [24297, 92],
  KeyY: [24811, 93],
  KeyU: [25313, 95],
  KeyI: [25795, 91],
  KeyO: [26309, 84],
  KeyP: [26804, 83],
  BracketLeft: [27330, 85],
  BracketRight: [27883, 99],
  Backslash: [28393, 100],
  CapsLock: [31011, 126],
  KeyA: [31542, 85],
  KeyS: [32031, 88],
  KeyD: [32492, 85],
  KeyF: [32973, 87],
  KeyG: [33453, 94],
  KeyH: [33986, 93],
  KeyJ: [34425, 88],
  KeyK: [34932, 90],
  KeyL: [35410, 95],
  Semicolon: [35914, 95],
  Quote: [36428, 87],
  Enter: [36902, 117],
  ShiftLeft: [38136, 133],
  KeyZ: [38694, 80],
  KeyX: [39148, 76],
  KeyC: [39632, 95],
  KeyV: [40136, 94],
  KeyB: [40621, 107],
  KeyN: [41103, 90],
  KeyM: [41610, 93],
  Comma: [42110, 92],
  Period: [42594, 90],
  Slash: [43105, 95],
  ShiftRight: [43565, 137],
  Fn: [44251, 110],
  ControlLeft: [45327, 83],
  AltLeft: [45750, 82],
  MetaLeft: [46199, 100],
  Space: [51541, 144],
  MetaRight: [47929, 75],
  AltRight: [49329, 82],
  ArrowUp: [44251, 110],
  ArrowLeft: [49837, 88],
  ArrowDown: [50333, 90],
  ArrowRight: [50783, 111],
};

const SOUND_DEFINES_UP: Record<string, [number, number]> = Object.fromEntries(
  Object.entries(SOUND_DEFINES_DOWN).map(([k, [s, d]]) => [
    k,
    [s + Math.floor(d * 0.9), Math.max(70, Math.floor(d * 0.85))],
  ]),
);

const KEY_DISPLAY_LABELS: Record<string, string> = {
  Escape: "esc",
  Backspace: "delete",
  Tab: "tab",
  Enter: "return",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  ControlLeft: "control",
  ControlRight: "control",
  AltLeft: "option",
  AltRight: "option",
  MetaLeft: "command",
  MetaRight: "command",
  Space: "space",
  CapsLock: "caps",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Backquote: "`",
  Minus: "-",
  Equal: "=",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Slash: "/",
};

const getKeyDisplayLabel = (keyCode: string): string => {
  if (KEY_DISPLAY_LABELS[keyCode]) return KEY_DISPLAY_LABELS[keyCode];
  if (keyCode.startsWith("Key")) return keyCode.slice(3);
  if (keyCode.startsWith("Digit")) return keyCode.slice(5);
  if (keyCode.startsWith("F") && keyCode.length <= 3) return keyCode;
  return keyCode;
};

interface KeyboardContextType {
  playSoundDown: (keyCode: string) => void;
  playSoundUp: (keyCode: string) => void;
  pressedKeys: Set<string>;
  setPressed: (keyCode: string) => void;
  setReleased: (keyCode: string) => void;
  lastPressedKey: string | null;
}

const KeyboardContext = createContext<KeyboardContextType | null>(null);

const useKeyboardSound = () => {
  const ctx = useContext(KeyboardContext);
  if (!ctx) throw new Error("useKeyboardSound must be used within KeyboardProvider");
  return ctx;
};

const KeyboardProvider = ({
  children,
  enableSound = false,
  containerRef,
  volume = 0.6,
  soundOn = true,
  onInteract,
}: {
  children: React.ReactNode;
  enableSound?: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  volume?: number;
  soundOn?: boolean;
  onInteract?: () => void;
}) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enableSound) return;
    const initAudio = async () => {
      try {
        audioContextRef.current = new AudioContext();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = volume;
        gainNodeRef.current.connect(audioContextRef.current.destination);
        const response = await fetch("/sounds/sound.ogg");
        if (!response.ok) return;
        const arrayBuffer = await response.arrayBuffer();
        audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
        setSoundLoaded(true);
      } catch (e) {
        console.warn("Failed to load sound:", e);
      }
    };
    initAudio();
    return () => {
      audioContextRef.current?.close();
    };
  }, [enableSound]);

  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(
        soundOn ? volume : 0,
        audioContextRef.current.currentTime,
        0.01,
      );
    }
  }, [volume, soundOn]);

  const playSound = useCallback(
    (keyCode: string, defs: Record<string, [number, number]>) => {
      if (!enableSound || !soundLoaded || !soundOn) return;
      if (!audioContextRef.current || !audioBufferRef.current) return;
      const soundDef = defs[keyCode];
      if (!soundDef) return;
      const [startMs, durationMs] = soundDef;
      if (audioContextRef.current.state === "suspended") audioContextRef.current.resume();
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(gainNodeRef.current ?? audioContextRef.current.destination);
      source.start(0, startMs / 1000, durationMs / 1000);
    },
    [enableSound, soundLoaded, soundOn],
  );

  const playSoundDown = useCallback((k: string) => playSound(k, SOUND_DEFINES_DOWN), [playSound]);
  const playSoundUp = useCallback((k: string) => playSound(k, SOUND_DEFINES_UP), [playSound]);

  const setPressed = useCallback(
    (keyCode: string) => {
      onInteract?.();
      setPressedKeys((prev) => new Set(prev).add(keyCode));
      setLastPressedKey(keyCode);
    },
    [onInteract],
  );

  const setReleased = useCallback((keyCode: string) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(keyCode);
      return next;
    });
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      playSoundDown(e.code);
      setPressed(e.code);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      playSoundUp(e.code);
      setReleased(e.code);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isVisible, playSoundDown, playSoundUp, setPressed, setReleased]);

  return (
    <KeyboardContext.Provider
      value={{ playSoundDown, playSoundUp, pressedKeys, setPressed, setReleased, lastPressedKey }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

const KeystrokePreview = () => {
  const { lastPressedKey, pressedKeys } = useKeyboardSound();
  const [displayKey, setDisplayKey] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (lastPressedKey) {
      if (
        lastPressedKey === "Space" ||
        lastPressedKey === "ShiftLeft" ||
        lastPressedKey === "ShiftRight"
      ) {
        setDisplayKey(null);
        return;
      }
      setDisplayKey(getKeyDisplayLabel(lastPressedKey));
      setAnimationKey((p) => p + 1);
    }
  }, [lastPressedKey]);

  const isPressed = pressedKeys.size > 0;

  return (
    <div className="relative flex h-12 w-full items-center justify-center">
      <AnimatePresence mode="popLayout">
        {displayKey && (
          <motion.div
            key={animationKey}
            layout
            initial={{ opacity: 0, scale: 0.5, y: 5 }}
            animate={{ opacity: 1, scale: isPressed ? 0.95 : 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -5 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
            className="absolute flex items-center justify-center rounded-lg px-4 py-2 font-mono text-2xl font-black text-foreground/70"
          >
            <motion.span
              initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              animate={{ opacity: 0.6, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.05 }}
              className="text-2xl"
            >
              {displayKey}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Keyboard = ({
  className,
  enableSound = false,
  showPreview = false,
}: {
  className?: string;
  enableSound?: boolean;
  showPreview?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Sound permission gate: user must explicitly allow before any sound plays.
  const [permission, setPermission] = useState<"unknown" | "granted" | "denied">("unknown");
  const [askOpen, setAskOpen] = useState(false);
  const soundOn = permission === "granted";
  const [volume] = useState(0.6);

  const handleFirstInteraction = useCallback(() => {
    if (enableSound && permission === "unknown") {
      setAskOpen(true);
    }
  }, [enableSound, permission]);

  const allowSound = useCallback(() => {
    setPermission("granted");
    setAskOpen(false);
  }, []);
  const denySound = useCallback(() => {
    setPermission("denied");
    setAskOpen(false);
  }, []);

  return (
    <KeyboardProvider
      enableSound={enableSound}
      containerRef={containerRef}
      soundOn={soundOn}
      volume={volume}
      onInteract={handleFirstInteraction}
    >
      <div
        ref={containerRef}
        className={cn(
          "relative mx-auto w-fit [zoom:0.8] sm:[zoom:1.25] md:[zoom:1.5] lg:[zoom:1.75] xl:[zoom:2]",
          className,
        )}
      >
        {showPreview && <KeystrokePreview />}
        <Keypad />
        <AnimatePresence>
          {askOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="kbd-perm-title"
            >
              <motion.div
                initial={{ y: 8, scale: 0.96, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 4, scale: 0.98, opacity: 0 }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
                className="w-[220px] rounded-2xl border border-white/10 bg-neutral-900/90 p-3 text-center shadow-2xl"
              >
                <div className="mx-auto mb-1.5 flex size-8 items-center justify-center rounded-full bg-white/10">
                  <IconVolume className="size-4 text-white" />
                </div>
                <p id="kbd-perm-title" className="text-[10px] font-semibold text-white">
                  Enable keyboard sounds?
                </p>
                <p className="mt-0.5 text-[8px] leading-tight text-white/60">
                  Play a subtle click on every keypress.
                </p>
                <div className="mt-2 flex items-center justify-center gap-1.5">
                  <button
                    type="button"
                    onClick={denySound}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-medium text-white/80 transition hover:bg-white/10"
                  >
                    Not now
                  </button>
                  <button
                    type="button"
                    onClick={allowSound}
                    className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-neutral-900 transition hover:bg-white/90"
                  >
                    Allow
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </KeyboardProvider>
  );
};

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-[2px] mb-[2px] last:mb-0">{children}</div>
);

const Key = ({
  children,
  keyCode,
  className,
  containerClassName,
  childrenClassName,
}: {
  children?: React.ReactNode;
  keyCode?: string;
  className?: string;
  containerClassName?: string;
  childrenClassName?: string;
}) => {
  const ctx = useContext(KeyboardContext);
  const pressed = keyCode && ctx?.pressedKeys.has(keyCode);

  const handleDown = () => {
    if (!keyCode || !ctx) return;
    ctx.playSoundDown(keyCode);
    ctx.setPressed(keyCode);
  };
  const handleUp = () => {
    if (!keyCode || !ctx) return;
    ctx.playSoundUp(keyCode);
    ctx.setReleased(keyCode);
  };

  return (
    <div
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseLeave={() => pressed && handleUp()}
      onTouchStart={handleDown}
      onTouchEnd={handleUp}
      className={cn(
        "relative flex h-6 w-6 select-none items-center justify-center rounded-[4px] bg-card text-[6px] font-medium text-muted-foreground shadow-[0_1px_0_0_var(--color-border),0_0_0_1px_var(--color-border)] transition-all duration-75 cursor-pointer",
        pressed && "translate-y-[1px] shadow-[0_0_0_1px_var(--color-border)] bg-muted",
        containerClassName,
        className,
      )}
    >
      <div
        className={cn("flex h-full w-full flex-col items-center justify-center", childrenClassName)}
      >
        {children}
      </div>
    </div>
  );
};

export const Keypad = () => {
  return (
    <div className="h-full w-fit rounded-xl bg-muted p-1 shadow-sm ring-1 shadow-black/5 ring-border">
      {/* Function Row */}
      <Row>
        <Key
          keyCode="Escape"
          containerClassName="rounded-tl-xl"
          className="w-10 rounded-tl-lg"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>esc</span>
        </Key>
        <Key keyCode="F1">
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1">F1</span>
        </Key>
        <Key keyCode="F2">
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1">F2</span>
        </Key>
        <Key keyCode="F3">
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1">F3</span>
        </Key>
        <Key keyCode="F4">
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1">F4</span>
        </Key>
        <Key keyCode="F5">
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1">F5</span>
        </Key>
        <Key keyCode="F6">
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1">F6</span>
        </Key>
        <Key keyCode="F7">
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1">F7</span>
        </Key>
        <Key keyCode="F8">
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1">F8</span>
        </Key>
        <Key keyCode="F9">
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1">F9</span>
        </Key>
        <Key keyCode="F10">
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1">F10</span>
        </Key>
        <Key keyCode="F11">
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1">F11</span>
        </Key>
        <Key keyCode="F12">
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1">F12</span>
        </Key>
        <Key containerClassName="rounded-tr-xl" className="rounded-tr-lg">
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-muted via-card to-muted p-px">
            <div className="h-full w-full rounded-full bg-card" />
          </div>
        </Key>
      </Row>

      {/* Number Row */}
      <Row>
        <Key keyCode="Backquote">
          <span>~</span>
          <span>`</span>
        </Key>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((n, i) => (
          <Key key={n} keyCode={`Digit${n}`}>
            <span>{["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"][i]}</span>
            <span>{n}</span>
          </Key>
        ))}
        <Key keyCode="Minus">
          <span>—</span>
          <span>_</span>
        </Key>
        <Key keyCode="Equal">
          <span>+</span>
          <span>=</span>
        </Key>
        <Key
          keyCode="Backspace"
          className="w-10"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
        >
          <span>delete</span>
        </Key>
      </Row>

      {/* QWERTY Row */}
      <Row>
        <Key
          keyCode="Tab"
          className="w-10"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>tab</span>
        </Key>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((l) => (
          <Key key={l} keyCode={`Key${l}`}>
            {l}
          </Key>
        ))}
        <Key keyCode="BracketLeft">
          <span>{`{`}</span>
          <span>{`[`}</span>
        </Key>
        <Key keyCode="BracketRight">
          <span>{`}`}</span>
          <span>{`]`}</span>
        </Key>
        <Key keyCode="Backslash">
          <span>{`|`}</span>
          <span>{`\\`}</span>
        </Key>
      </Row>

      {/* Home Row */}
      <Row>
        <Key
          keyCode="CapsLock"
          className="w-[2.8rem]"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>caps lock</span>
        </Key>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((l) => (
          <Key key={l} keyCode={`Key${l}`}>
            {l}
          </Key>
        ))}
        <Key keyCode="Semicolon">
          <span>:</span>
          <span>;</span>
        </Key>
        <Key keyCode="Quote">
          <span>{`"`}</span>
          <span>{`'`}</span>
        </Key>
        <Key
          keyCode="Enter"
          className="w-[2.85rem]"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
        >
          <span>return</span>
        </Key>
      </Row>

      {/* Shift Row */}
      <Row>
        <Key
          keyCode="ShiftLeft"
          className="w-[3.65rem]"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>shift</span>
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((l) => (
          <Key key={l} keyCode={`Key${l}`}>
            {l}
          </Key>
        ))}
        <Key keyCode="Comma">
          <span>{`<`}</span>
          <span>,</span>
        </Key>
        <Key keyCode="Period">
          <span>{`>`}</span>
          <span>.</span>
        </Key>
        <Key keyCode="Slash">
          <span>?</span>
          <span>/</span>
        </Key>
        <Key
          keyCode="ShiftRight"
          className="w-[3.65rem]"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
        >
          <span>shift</span>
        </Key>
      </Row>

      {/* Bottom Row */}
      <Row>
        <Key
          keyCode="Fn"
          containerClassName="rounded-bl-xl"
          className="rounded-bl-lg"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <div className="flex w-full justify-between">
            <span>fn</span>
          </div>
          <div className="flex w-full justify-between">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </Key>
        <Key keyCode="ControlLeft" childrenClassName="items-start justify-end pb-[2px] pl-[4px]">
          <div className="flex w-full justify-end">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start">control</div>
        </Key>
        <Key keyCode="AltLeft" childrenClassName="items-start justify-end pb-[2px] pl-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconCaretUpFilled className="h-[4px] w-[4px]" />
          </div>
          <div className="flex w-full justify-start">option</div>
        </Key>
        <Key
          keyCode="MetaLeft"
          className="w-8"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start">command</div>
        </Key>
        <Key keyCode="Space" className="w-[8.2rem]" />
        <Key
          keyCode="MetaRight"
          className="w-8"
          childrenClassName="items-start justify-start pb-[2px] pl-[4px]"
        >
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start">command</div>
        </Key>
        <Key keyCode="AltRight" childrenClassName="items-start justify-start pb-[2px] pl-[4px]">
          <div className="flex w-full justify-start pl-1">
            <IconCaretUpFilled className="h-[4px] w-[4px]" />
          </div>
          <div className="flex w-full justify-start">option</div>
        </Key>
        <div className="flex flex-col gap-[2px]">
          <div className="flex gap-[2px]">
            <Key className="h-[11px]" />
            <Key keyCode="ArrowUp" className="h-[11px]">
              <IconCaretUpFilled className="h-[4px] w-[4px]" />
            </Key>
            <Key className="h-[11px]" containerClassName="rounded-br-xl" />
          </div>
          <div className="flex gap-[2px]">
            <Key keyCode="ArrowLeft" className="h-[11px]">
              <IconCaretLeftFilled className="h-[4px] w-[4px]" />
            </Key>
            <Key keyCode="ArrowDown" className="h-[11px]">
              <IconCaretDownFilled className="h-[4px] w-[4px]" />
            </Key>
            <Key keyCode="ArrowRight" className="h-[11px]" containerClassName="rounded-br-xl">
              <IconCaretRightFilled className="h-[4px] w-[4px]" />
            </Key>
          </div>
        </div>
      </Row>
    </div>
  );
};
