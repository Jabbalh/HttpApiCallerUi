import {Ref} from "vue";
import {AppEnvironnement} from "src/models/model";
import {hoverTooltip} from "@codemirror/view";
import {ENV_REGEXT} from "src/composables/parseEnv";

export const cursorTooltipField = (aggregateEnvs: Ref<AppEnvironnement | null>) =>
  hoverTooltip(
    (view, pos, side) => {
      const { from, to, text } = view.state.doc.lineAt(pos)

      // Tracking the start and the end of the words
      let start = pos
      let end = pos

      while (start > from && /[a-zA-Z0-9-_]+/.test(text[start - from - 1]))
        start--
      while (end < to && /[a-zA-Z0-9-_]+/.test(text[end - from])) end++

      if (
        (start === pos && side < 0) ||
        (end === pos && side > 0) ||
        !ENV_REGEXT.test(
          text.slice(start - from - 2, end - from + 2)
        )
      )
        return null

      const parsedEnvKey = text.slice(start - from, end - from)

      const tooltipEnv = aggregateEnvs.value?.values.find((env) => env.key === parsedEnvKey)

      const envName = aggregateEnvs?.value?.name ?? 'Choose an Environment'

      const envValue = tooltipEnv?.value ?? 'Not found'

      const envTypeIcon = `<span class='inline-flex items-center justify-center my-1'></span>`

      return {
        pos: start,
        end: to,
        above: true,
        arrow: true,
        create() {
          const dom = document.createElement('span')
          const tooltipContainer = document.createElement('span')
          const kbd = document.createElement('kbd')
          const icon = document.createElement('span')
          icon.innerHTML = envTypeIcon
          icon.className = 'mr-2'
          kbd.textContent = envValue;
          tooltipContainer.appendChild(icon)
          tooltipContainer.appendChild(document.createTextNode(`${envName} `))
          tooltipContainer.appendChild(kbd)
          //if (tooltipEnv) appendEditAction(tooltipContainer)
          tooltipContainer.className = 'tippy-content'
          dom.className = 'tippy-box'
          dom.dataset.theme = 'tooltip'
          dom.appendChild(tooltipContainer)
          return { dom }
        },
      }
    },
    // HACK: This is a hack to fix hover tooltip not coming half of the time
    // https://github.com/codemirror/tooltip/blob/765c463fc1d5afcc3ec93cee47d72606bed27e1d/src/tooltip.ts#L622
    // Still doesn't fix the not showing up some of the time issue, but this is atleast more consistent
    { hoverTime: 1 }
  );
