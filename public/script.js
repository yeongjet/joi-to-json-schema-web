window.onload = function(){
  this.console.log('onloaded')
  $('#editor').val(`请输入joi-schema 示例:\nJoi.number().min(1).max(10)`)
  $('#convert').on('click', function(){
    const input = $('#editor').val().trim()
    $.post('/schema', { input }, function(res){
      let output = ''
      switch(res.code){
        case 10000:
          output = JSON.stringify(res.data.json_schema)
          break
        case 10001:
          output = '解析错误, 请检查格式'
          break
        default:
          output = '服务出错，请稍后重试'
      }
      $('#output').text(output)
    })
  })
}