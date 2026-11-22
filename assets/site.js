const form = document.querySelector('#quotes');
if (form) {
  const formatter = new Intl.NumberFormat('ko-KR');
  const groups = [...form.querySelectorAll('fieldset')];
  const difference = document.querySelector('#difference');
  function updateQuotes() {
    const totals = groups.map(group => {
      const fields = [...group.querySelectorAll('input')];
      const total = fields.reduce((sum, field) => sum + (field.valueAsNumber || 0), 0);
      const started = fields.some(field => field.value !== '');
      const valid = fields.every(field => field.validity.valid);
      group.querySelector('output').textContent = !valid ? '0원 이상의 정수로 입력해 주세요.' :
        started ? formatter.format(total) + '원' : '입력 전';
      return valid && started ? total : null;
    });
    difference.textContent = totals.includes(null) ? '두 견적에 금액을 입력하면 차이가 표시됩니다.' :
      totals[0] === totals[1] ? '입력한 금액의 합계가 같습니다.' :
      '견적 ' + (totals[0] > totals[1] ? 'A' : 'B') + '의 입력 금액 합계가 ' +
      formatter.format(Math.abs(totals[0] - totals[1])) + '원 더 높습니다.';
  }
  form.addEventListener('input', updateQuotes);
  form.addEventListener('reset', () => queueMicrotask(updateQuotes));
  form.addEventListener('submit', event => event.preventDefault());
  updateQuotes();
}
const checklist = document.querySelector('.checks');
if (checklist) {
  const items = [...checklist.querySelectorAll('input')];
  const progress = document.querySelector('#progress');
  function updateChecks() {
    progress.textContent = items.filter(item => item.checked).length + ' / ' + items.length + '개 확인';
  }
  checklist.addEventListener('change', updateChecks);
  checklist.addEventListener('reset', () => queueMicrotask(updateChecks));
  updateChecks();
}
