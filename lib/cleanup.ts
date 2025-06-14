// File cleanup utility - identifies unused files and dependencies

export const UNUSED_FILES = [
  // UI Components (Remove these)
  "components/ui/accordion.tsx",
  "components/ui/alert-dialog.tsx",
  "components/ui/aspect-ratio.tsx",
  "components/ui/breadcrumb.tsx",
  "components/ui/calendar.tsx",
  "components/ui/carousel.tsx",
  "components/ui/chart.tsx",
  "components/ui/collapsible.tsx",
  "components/ui/command.tsx",
  "components/ui/context-menu.tsx",
  "components/ui/drawer.tsx",
  "components/ui/hover-card.tsx",
  "components/ui/input-otp.tsx",
  "components/ui/menubar.tsx",
  "components/ui/navigation-menu.tsx",
  "components/ui/pagination.tsx",
  "components/ui/radio-group.tsx",
  "components/ui/resizable.tsx",
  "components/ui/scroll-area.tsx",
  "components/ui/slider.tsx",
  "components/ui/sonner.tsx",
  "components/ui/switch.tsx",
  "components/ui/toggle-group.tsx",
  "components/ui/toggle.tsx",
  "components/ui/use-mobile.tsx", // Duplicate
]

export const CONSOLIDATE_FILES = [
  // These can be merged
  {
    target: "components/dao/dao-components.tsx",
    sources: ["components/dao-list.tsx", "components/dao-dashboard.tsx", "components/create-dao-form.tsx"],
  },
  {
    target: "components/governance/governance-components.tsx",
    sources: ["components/proposal-creator.tsx", "components/voting-interface.tsx"],
  },
]

export const ESSENTIAL_COMPONENTS = [
  "components/ui/button.tsx",
  "components/ui/card.tsx",
  "components/ui/input.tsx",
  "components/ui/textarea.tsx",
  "components/ui/label.tsx",
  "components/ui/badge.tsx",
  "components/ui/tabs.tsx",
  "components/ui/dialog.tsx",
  "components/ui/dropdown-menu.tsx",
  "components/ui/avatar.tsx",
  "components/ui/progress.tsx",
  "components/ui/select.tsx",
  "components/ui/sheet.tsx",
  "components/ui/table.tsx",
  "components/ui/toast.tsx",
  "components/ui/toaster.tsx",
  "components/ui/tooltip.tsx",
  "components/ui/popover.tsx",
  "components/ui/form.tsx",
  "components/ui/checkbox.tsx",
  "components/ui/separator.tsx",
  "components/ui/skeleton.tsx",
]
