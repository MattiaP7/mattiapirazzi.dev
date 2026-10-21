import {
  Monitor,
  Cpu,
  Server,
  Terminal,
  Code2,
  ShieldCheck,
  HardDrive,
} from "lucide-react";

export const metadata = {
  title: "Setup & Hardware | Mattia Pirazzi",
  description:
    "L'ambiente di lavoro: workstation PC, Arch Linux con Hyprland, dotfiles e Home Lab.",
};

export default function SetupPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-3 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Setup, Dotfiles & Hardware
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Uno sguardo all'hardware che uso quotidianamente, la configurazione
          software di Arch Linux e le infrastrutture del mio Home Lab.
        </p>
      </header>

      {/* Sezione 1: Sistema Operativo & Ambiente di Lavoro */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-500" />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Ambiente Software & Dotfiles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SetupCard
            title="OS & Window Manager"
            items={[
              { label: "Distribuzione", value: "Arch Linux (Rolling Release)" },
              { label: "Compositor", value: "Hyprland (Wayland)" },
              // { label: "Status Bar", value: "Waybar" },
              {
                label: "Shell & Prompt",
                value: "Zsh / Noctalia Shell + Starship",
              },
            ]}
          />
          <SetupCard
            title="Editor & Terminale"
            items={[
              {
                label: "Editor Principale",
                value: "Neovim ",
              },
              { label: "IDE secondario", value: "VS Code " },
              { label: "Terminale", value: "Kitty" },
            ]}
          />
        </div>
      </section>

      {/* Sezione 2: Workstation Desktop (Hardware) */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Workstation Desktop
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SetupCard
            title="Specifiche Hardware PC"
            items={[
              { label: "CPU", value: "AMD Ryzen 5 7500F (6 Core / 12 Thread)" },
              { label: "GPU", value: "AMD Radeon RX 7600 8GB" },
              { label: "RAM", value: "32GB DDR5 6000MHz" },
              { label: "Scheda Madre", value: "GIGABYTE B650 EAGLE AX (AM5)" },
            ]}
          />
          <SetupCard
            title="Periferiche & Monitor"
            items={[
              {
                label: "Display Principale",
                value: 'KOORUI 24" 1080p 165Hz IPS',
              },
              {
                label: "Display Secondario",
                value: "Monitor secondario 1080p",
              },
            ]}
          />
        </div>
      </section>

      {/* Sezione 3: Home Lab & Server Casalingo */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-purple-500" />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Home Lab & Self-Hosting
          </h2>
        </div>

        <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
              Mini PC Intel N100 Server
            </h3>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
              Ubuntu Server + Docker
            </span>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Un mini PC a basso consumo basato su architettura Intel N100 che
            gestisce i servizi cloud di casa, il media center familiare e il
            backup continuo protetto da Gruppo di Continuità (UPS) monitorato
            via NUT.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
              <span className="text-neutral-400 block">Piattaforma:</span>{" "}
              CasaOS & Docker
            </div>
            <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
              <span className="text-neutral-400 block">Media Streaming:</span>{" "}
              Jellyfin + Moonfin
            </div>
            <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
              <span className="text-neutral-400 block">Photo Backup:</span>{" "}
              Immich
            </div>
            <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
              <span className="text-neutral-400 block">Arr Stack:</span> Radarr,
              Sonarr, Prowlarr
            </div>
            <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
              <span className="text-neutral-400 block">Dashboard:</span> Homarr
            </div>
            <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
              <span className="text-neutral-400 block">UPS Power:</span> NUT
              Monitoring
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SetupCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-3">
      <h3 className="font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">
        {title}
      </h3>
      <dl className="space-y-2 text-sm">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between gap-2">
            <dt className="text-neutral-500 dark:text-neutral-400 shrink-0">
              {item.label}:
            </dt>
            <dd className="font-mono text-neutral-900 dark:text-neutral-200 text-right truncate">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
