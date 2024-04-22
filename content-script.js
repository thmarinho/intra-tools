const btnStyle = "background-color: #ff7600; font-size: 10px; color: black; padding: 5px 10px; margin: 0px 10px; border-radius: 5px";

(() => {
  // Profile
  if (!window.location.href.includes("/user/")) return;

  const email = document.getElementsByClassName("item login")[0]?.children[1].textContent.trim();

  const sauronBtn = document.createElement("a");
  sauronBtn.href = `https://sauron.epitest.eu/student/${email}`;
  sauronBtn.text = "Sauron profile";
  sauronBtn.target = "_blank";
  sauronBtn.style = btnStyle;

  const teamsBtn = document.createElement("a");
  teamsBtn.href = `https://teams.microsoft.com/l/chat/0/0?users=${email}`;
  teamsBtn.text = "Call with teams";
  teamsBtn.target = "_blank";
  teamsBtn.style = btnStyle;

  document.getElementsByClassName("item login")[0].appendChild(sauronBtn);
  document.getElementsByClassName("item login")[0].appendChild(teamsBtn);

  document.getElementsByClassName("item login")[0].style = "padding-bottom: 5px;"
})();

(() => {
  // Sidebar
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return

  function updateModulesName(s) {
    if (!s.href.includes("/module/") || !s.href.endsWith("/all"))
      return;
    const uri = s.href.split('/');
    const i = uri.indexOf("module");
    const code_module = uri[i + 2];
    if (!s.text.startsWith('[' + code_module + ']')) {
      s.text = '[' + code_module + ']' + " " + s.text;
    }
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    const mutations = mutationsList.filter((m) => m.target && m.target.nodeName === "DD");
    const semesters = mutations.map((m) => m.target);
    const modules = semesters.map((s) => s.children).flat().map((h) => [...h]).flat().filter((value, index, self) => self.indexOf(value) === index);
    modules.forEach((m) => {
      m.style = 'overflow:hidden;';
      const sections = m.getElementsByTagName('a');
      Array.prototype.forEach.call(sections, (s) => {
        updateModulesName(s);
      });
    });
  });

  observer.observe(sidebar, { attributes: true, childList: true, subtree: true });
})();

(() => {
  // Jenkins
  const projects = document.querySelectorAll("a.info.project");

  projects.forEach(project => {
    const link = project.href.split('/');
    const code = link[5];
    const city = link[6];
    const splittedCode = code.split('-');
    const shortCode = `${splittedCode[0]}-${splittedCode[1]}`;


    const li = project.parentElement.parentElement;
    const projectName = li.children[5].textContent;
    const formattedProjectName = (projectName.toLowerCase()).replaceAll(' ', '');

    console.log(formattedProjectName)

    const jenkinsBtn = document.createElement("a");
    jenkinsBtn.href = `https://jenkins.epitest.eu/view/${shortCode}/job/${code}/job/${formattedProjectName}/job/2023/job/${city}/`;
    jenkinsBtn.text = "Go to jenkins";
    jenkinsBtn.target = "_blank";
    jenkinsBtn.style = btnStyle;
    li.children[2].append(jenkinsBtn);
    li.children[2].style = "display: inline-flex; background: #0000; align-items: center; flex-direction: row-reverse; text-transform: inherit;";
  });
})();

(() => {
  // Calendar colors
  if (!window.location.href.startsWith('https://intra.epitech.eu/planning/#')) return;

  const observer = new MutationObserver((mutationsList, observer) => {
    const events = document.getElementsByClassName("appoint");

    const palette = {
      '': "#21A0A0",

      'kick-off': "#665687",
      'bootstrap': "#665687",

      'follow-up': '#549F93',

      'hub': '#ffcb77',

      'delivery': '#798071',
      'defense': '#798071',

      'stumper': '#dd7373',
      'kyt/cat': '#dd7373',
      'tepitech': '#dd7373',
    }

    Array.from(events).forEach(event => {
      txt = event.textContent.toLocaleLowerCase()

      Object.keys(palette).forEach(key => {
        if (txt.includes(key)) {
          event.style['background-color'] = palette[key]
          event.lastChild.style['background-color'] = palette[key]
          event.style.color = 'black!important'
          return
        }
      })
    });
  });

  observer.observe(sidebar, { attributes: true, childList: true, subtree: true });
})();

(() => {
  // Useless activities in calendar
  if (!window.location.href.startsWith('https://intra.epitech.eu/planning/#')) return;

  const observer = new MutationObserver((mutationsList, observer) => {
    const events = document.getElementsByClassName("appoint");

    Array.from(events).forEach(event => {
      txt = event.textContent.toLocaleLowerCase()
      if (!window.location.href.includes("seeAll") && (
        txt.includes("epitech digital") ||
        txt.includes("suivi des sessions de formation") ||
        txt.includes("emargementmsclyon") ||
        txt.includes("susie") ||
        txt.match(/w[0-9]/) ||
        (txt.includes("school life") && !txt.includes('rencontre')) ||
        txt.includes("cold case") ||
        txt.includes("pcp") ||
        txt.includes("promoting epitech") ||
        txt.includes("paradigms seminar") ||
        (txt.includes("coaching") && !txt.includes("technical coaching")) ||
        txt.includes("epitech diversity") ||
        txt.includes("coding pool") ||
        txt.includes("coding club") ||
        txt.includes("tech 0") ||
        txt.includes("résa msc")
      ))
        event.style = "display: none;";
    });
  });

  observer.observe(sidebar, { attributes: true, childList: true, subtree: true });
})();