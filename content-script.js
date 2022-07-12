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
  // Group
  if (!window.location.href.endsWith("#!/group")) return;

  Array.from(document.getElementsByClassName("wrapper")).map((group, idx) => {
    if (idx == 0) return;
    return group;
  }).filter(e => e).forEach((group) => {
    const emails = Array.from(group.children[2].children).map(user => user.dataset.memberLogin);

    const teamsBtn = document.createElement("a");
    teamsBtn.href = `https://teams.microsoft.com/l/chat/0/0?users=${emails.join(',')}`;
    teamsBtn.text = "Call with teams";
    teamsBtn.target = "_blank";
    teamsBtn.style = btnStyle;
    group.getElementsByClassName("groupinfo")[0].append(teamsBtn);

  })
})();

(() => {
  // Sidebar
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return

  function updateModulesName(s) {
    if (!s.href.includes("/module/") || !s.href.endsWith("/all"))
      return
    const uri = s.href.split('/');
    const i = uri.indexOf("module");
    const code_module = uri[i + 2]
    if (!s.text.startsWith('[' + code_module + ']')) {
      s.text = '[' + code_module + ']' + " " + s.text;
    }
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    const mutations = mutationsList.filter((m) => m.target && m.target.nodeName === "DD")
    const semesters = mutations.map((m) => m.target)
    const modules = semesters.map((s) => s.children).flat().map((h) => [...h]).flat().filter((value, index, self) => self.indexOf(value) === index)
    modules.forEach((m) => {
      m.style = 'overflow:hidden;';
      const sections = m.getElementsByTagName('a');
      Array.prototype.forEach.call(sections, (s) => {
        updateModulesName(s);
      })
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
    const formattedProjectName = projectName.charAt(0).toLowerCase() + projectName.slice(1);

    const jenkinsBtn = document.createElement("a");
    jenkinsBtn.href = `https://jenkins.epitest.eu/view/${shortCode}/job/${code}/job/${formattedProjectName}/job/2021/job/${city}/`;
    jenkinsBtn.text = "Go to jenkins";
    jenkinsBtn.target = "_blank";
    jenkinsBtn.style = btnStyle;
    li.children[2].append(jenkinsBtn);
    li.children[2].style = "display: inline-flex; background: #0000; align-items: center; flex-direction: row-reverse; text-transform: inherit;";
  });
})();

(() => {
  // Epitech digital
  if (!window.location.href.startsWith('https://intra.epitech.eu/planning/#!')) return;

  const observer = new MutationObserver((mutationsList, observer) => {
    const events = document.getElementsByClassName("appoint");

    Array.from(events).forEach(event => {
      if (event.textContent.toLocaleLowerCase().includes("epitech digital"))
        event.style = "display: none;"
    })
  });

  observer.observe(sidebar, { attributes: true, childList: true, subtree: true });
})();
