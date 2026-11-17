# Local AI setup — LIFEVERSE

LIFEVERSE uses Ollama locally. No paid API key or external AI account is required.

## Requirements
- Ollama installed and running on Windows.
- The model `qwen3.5:4b` downloaded locally.
- The LIFEVERSE app running on the same computer as Ollama.

## Install and verify the model
In PowerShell:

```powershell
ollama --version
ollama pull qwen3.5:4b
ollama run qwen3.5:4b
```

Enter a short prompt to confirm the model responds, then type `/bye` to leave the model session. Ollama normally exposes its local API at `http://127.0.0.1:11434`.

## App configuration
The defaults are already set in `.env.example`. Make sure your local `.env` contains:

```env
OLLAMA_BASE_URL="http://127.0.0.1:11434"
OLLAMA_MODEL="qwen3.5:4b"
```

Keep the existing `DATABASE_URL` value in your `.env`. Do not commit local database files or private environment files.

## Story behavior
After a player turn is saved, the server sends the scene context, recent turns and non-secret participant profile fields to Ollama on localhost. The model must return JSON segments for the narrator and/or NPCs. The server validates speaker types and NPC IDs before saving the segments as separate turns.

The Player Character is never a valid AI speaker. Character secrets are not included in the prompt. If Ollama is unavailable or returns invalid output, the player turn remains saved and the scene offers a retry action.

The app removes common model reasoning markers such as `<think>...</think>` from generated content. The model is also instructed to return only the requested JSON, without analysis or planning text.

All prompts and story content stay on the local machine when using this Ollama configuration.
