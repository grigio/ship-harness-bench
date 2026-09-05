<div align="center">

![Ship Harness Bench](https://github.com/user-attachments/assets/placeholder)

# Ship Harness Bench

**A benchmark to evaluate the quality of different LLM coding harnesses**

</div>

---

## The Prompt

Each agent received the **same prompt** and produced a browser-based 3D ship simulator:

> Create a beautiful, relaxing, 3D ship simulator for the browser with the sun in the horizon alternating day and night and when you click on the sea the water makes a wave

## The Model

Most tests were done with **Deepseek V4 Flash 0731**.

## The Agents

| Agent | Simulator | Approach |
|-------|-----------|----------|
| [Codex](./ship-sim-codex/) | Ship Sim | Import maps + modular Three.js |
| [DSH](./ship-sim-dsh/) | Open Sea | Self-contained inline bundle |
| [Jcode](./ship-sim-jcode/) | Voyager | Vanilla JS + verification scripts |
| [Jcode FX](./ship-sim-jcode-fx/) | Ship Simulator | Bun-built bundle |
| [Jcode 2](./ship-sim-jcode2/) | Sunset Sails | Static vanilla JS |
| [O-0x](./ship-sim-o-0x/) | Adrift | Vendored Three.js |
| [Muse](./ship-sim-o-muse-1.2/) | Drift | Vite build + custom fonts |
| [OpenCode](./ship-sim-opencode/) | Sunset Sail | Vendored Three.js |
| [Pi](./ship-sim-pi/) | A Quiet Sea | TypeScript + Vite + seagulls/audio |

## Takeaways

- **The model is important, but the harness is a worthy optimization.** The same model can produce vastly different results depending on the tooling around it.
- **A good browser-use tool is one of the most useful skills.** Being able to see, interact with, and verify what the model produces in a real browser is a game changer.
- **Memory and other tools could also be useful.** Context retention and auxiliary capabilities shape the quality of the output as much as the model itself.

## Running Locally

```bash
# Serve the gallery
python3 -m http.server 2222
# Open http://localhost:2222
```
