function _toConsumableArray(t) {
  return _arrayWithoutHoles(t) || _iterableToArray(t) || _unsupportedIterableToArray(t) || _nonIterableSpread()
}
function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.')
}
function _unsupportedIterableToArray(t, e) {
  if (t) {
    if ('string' == typeof t) return _arrayLikeToArray(t, e)
    var a = {}.toString.call(t).slice(8, -1)
    return ('Object' === a && t.constructor && (a = t.constructor.name), 'Map' === a || 'Set' === a ? Array.from(t) : 'Arguments' === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? _arrayLikeToArray(t, e) : void 0)
  }
}
function _iterableToArray(t) {
  if (('undefined' != typeof Symbol && null != t[Symbol.iterator]) || null != t['@@iterator']) return Array.from(t)
}
function _arrayWithoutHoles(t) {
  if (Array.isArray(t)) return _arrayLikeToArray(t)
}
function _arrayLikeToArray(t, e) {
  ;(null == e || e > t.length) && (e = t.length)
  for (var a = 0, n = Array(e); a < e; a++) n[a] = t[a]
  return n
}
function changeCategory(t) {
  layui.lotTwo.changeTypeDt(t)
}
function rowSelect(t) {
  layui.lotTwo.rowSelect(t)
}
function colSelect(t) {
  layui.lotTwo.colSelect(t)
}
function tdSelect(t) {
  layui.lotTwo.tdSelect(t)
}
function posiLotOther(t) {
  layui.lotTwo.posiLotOther(t)
}
function heOther(t) {
  layui.lotTwo.heOther(t)
}
function posiLot(t) {
  layui.lotTwo.posiLot(t)
}
function heFen(t) {
  layui.lotTwo.heFen(t)
}
function lotNum(t) {
  layui.lotTwo.lotNum(t)
}
function cancle() {
  layui.lotTwo.cancle()
}
function turnLot(t) {
  layui.quickType.turnLot(t)
}
function delStopNum(t) {
  layui.quickType.delStopNum(t)
}
function exportTxt(t) {
  layui.quickType.exportTxt(t)
}
function _slicedToArray(t, e) {
  return _arrayWithHoles(t) || _iterableToArrayLimit(t, e) || _unsupportedIterableToArray(t, e) || _nonIterableRest()
}
function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.')
}
function _unsupportedIterableToArray(t, e) {
  if (t) {
    if ('string' == typeof t) return _arrayLikeToArray(t, e)
    var a = {}.toString.call(t).slice(8, -1)
    return ('Object' === a && t.constructor && (a = t.constructor.name), 'Map' === a || 'Set' === a ? Array.from(t) : 'Arguments' === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? _arrayLikeToArray(t, e) : void 0)
  }
}
function _arrayLikeToArray(t, e) {
  ;(null == e || e > t.length) && (e = t.length)
  for (var a = 0, n = Array(e); a < e; a++) n[a] = t[a]
  return n
}
function _iterableToArrayLimit(t, e) {
  var a = null == t ? null : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator']
  if (null != a) {
    var n,
      i,
      l,
      r,
      o = [],
      s = !0,
      u = !1
    try {
      if (((l = (a = a.call(t)).next), 0 === e)) {
        if (Object(a) !== a) return
        s = !1
      } else for (; !(s = (n = l.call(a)).done) && (o.push(n.value), o.length !== e); s = !0);
    } catch (t) {
      ;((u = !0), (i = t))
    } finally {
      try {
        if (!s && null != a.return && ((r = a.return()), Object(r) !== r)) return
      } finally {
        if (u) throw i
      }
    }
    return o
  }
}
function _arrayWithHoles(t) {
  if (Array.isArray(t)) return t
}
;(layui.define(function (t) {
  var e = {
      '1_4': '以当前下单的号码和金额一直追号,每期追号的号码和金额不变',
      '1_5': '以当前下单的号码和金额一直追号,每期金额翻倍,号码不变',
      '1_6': '以当前下单的号码和金额一直追号,每期金额翻倍,中奖后金额重置为第一次追号的金额,号码不变',
      '1_7': '以当前下单的号码和金额一直追号,每期金额翻倍,号码不变,中奖后投注金额减半,如投注金额减半后有小数,则以大于金额一半的最小整数投注,如7元,中奖后投注金额为4元,如1元,中奖后投注金额为1元,该规则只对第一次中奖起效,后面再有号码中奖,金额不会再减半',
      '1_8': '以当前下单的号码和金额一直追号,号码不变,中奖后,把奖金按投注号码组数平均后,平均金额为整数则每组号码加上平均金额在投注,平均金额如有小数则每组号码加上小于平均金额的的最小整数后再投注,如奖金10元,投注号码3组,则每组号码加上3元再投注,如奖金10元,投注号码10组,则每组号码加上1元再投注',
      '2_4': '以当前下单的号码和金额一直追号,每期金额不变,号码不变,中奖后停止追号',
      '2_5': '以当前下单的号码和金额一直追号,每期金额翻倍,号码不变,中奖后停止追号',
      '2_6': '以当前下单的号码和金额一直追号,每期金额翻倍,号码不变,中奖后停止追号',
      '2_7': '以当前下单的号码和金额一直追号,每期金额不变,号码不变,中奖后停止追号',
      '2_8': '以当前下单的号码和金额一直追号,每期金额不变,号码不变,中奖后停止追号',
      '3_4': '以当前下单的号码和金额一直追号,每期金额不变,号码不变,当追号期数等于定义的期数时,停止追号',
      '3_5': '以当前下单的号码和金额一直追号,每期金额翻倍,号码不变,当追号期数等于定义的期数时,停止追号',
      '3_6': '以当前下单的号码和金额一直追号,每期金额翻倍,号码不变,中奖后金额重置为第一次追号的金额,当追号期数等于定义的期数时,停止追号',
      '3_7': '以当前下单的号码和金额一直追号,每期金额不变,号码不变,中奖后投注金额减半,如投注金额减半后有小数,则以大于金额一半的最小整数投注,如7元,中奖后投注金额为4元,如1元,中奖后投注金额为1元,该规则只对第一次中奖起效,后面再有号码中奖,金额不会再减半,当追号期数等于定义的期数时,停止追号',
      '3_8':
        '以当前下单的号码和金额一直追号,每期金额不变,号码不变,中奖后,把奖金按投注号码组数平均后,平均金额为整数则每组号码加上平均金额再投注,平均金额如有小数则每组号码加上小于平均金额的的最小整数后再投注,如奖金10元,投注号码3组,则每组号码加上3元再投注,如奖金10元,投注号码10组,则每组号码加上1元再投注,当追号期数等于定义的期数时,停止追号'
    },
    a = []
  t('chaseNumber', {
    showDetail: function (t) {
      var a = t || {}
      layui.utils.post('chaseNumber/chaseNumberDetail', a, function (t) {
        ;((t.mltt = {
          1: '一直追',
          2: '中奖自停',
          3: '自定义'
        }),
          (t.mlmy = {
            4: '固定金额',
            5: '每期翻倍',
            6: '每期翻倍，中奖重置',
            7: '中奖减半',
            8: '奖金累加投注'
          }),
          (t.desc = e),
          layui
            .laytpl(
              '{{# var ams = 0; }}<div class="mgl30 pd15 text-808080"><div>任务名称：{{d.enty.csName}}</div><div class="mgt15">期号规则：{{d.mltt[d.enty.bRule]}}</div>{{# if(d.enty.bRule==3){ }}<div>自定义追号期数:{{d.enty.mltt}}</div>{{# } }}<div class="mgt15">金额规则：{{d.mlmy[d.enty.sRuke]}}</div><div class="mgt15">规则描述：{{d.desc[d.enty.bRule+"_"+d.enty.sRuke]}}</div></div><div><table class="table table-fullCode mg0" border="1"><thead><tr class="bgcolor-success"><th >序号</th><th >号码</th><th >金额</th><th >序号</th><th >号码</th><th >金额</th><th >序号</th><th >号码</th><th >金额</th><th >序号</th><th >号码</th><th >金额</th><th >序号</th><th >号码</th><th >金额</th><th >序号</th><th >号码</th><th >金额</th></tr></thead><tbody>{{# layui.each(d.list,function(idx,item){ }}{{# ams=ams+item.CURRAMOUNT;}}{{# if(idx==0){ }}<tr><td>{{ idx+1 }}</td><td class="bgcolor-fcf5ed">{{ item.BETNUM }}</td><td class="bgcolor-fcf5ed">{{ layui.utils.numFormat(item.CURRAMOUNT,4)}}</td>{{# }else if(idx%6==0){ }}</tr><td>{{ idx+1 }}</td><td class="bgcolor-fcf5ed">{{ item.BETNUM }}</td><td class="bgcolor-fcf5ed">{{ layui.utils.numFormat(item.CURRAMOUNT,4)}}</td>{{# }else{ }}<td>{{ idx+1 }}</td><td class="bgcolor-fcf5ed">{{ item.BETNUM }}</td><td class="bgcolor-fcf5ed">{{ layui.utils.numFormat(item.CURRAMOUNT,4)}}</td>{{# } }}{{# });  }}{{# if(d.list.length>0 && d.list.length%6!=0){ }}{{# var rest=(6-d.list.length%6);}}{{# for(var i=0,l=rest; i<l; i++){ }}<td>{{d.list.length+1+i}}</td><td class="bgcolor-fcf5ed">--</td><td class="bgcolor-fcf5ed">--</td>{{# } }}{{# if(rest>0){ }}</tr>{{# } }}{{# } }}</tbody><tfoot><tr><td colspan=30>号码个数：{{d.list.length}} &nbsp;&nbsp;&nbsp;总金额：{{  layui.utils.numFormat(ams,4) }} &nbsp;&nbsp;&nbsp;</td></tr></tfoot></table></div>'
            )
            .render(t, function (t) {
              layer.open({
                type: 1,
                title: '自动追号',
                closeBtn: 1,
                area: ['60%', '70%'],
                shadeClose: !1,
                skin: 'demo-class',
                content: t,
                cancel: function () {},
                success: function () {}
              })
            }))
      })
    },
    addChaseNumber: function (t) {
      ;((a = t),
        layui
          .laytpl(
            '<div class="pd20"><div class="layui-form-item"><label class="layui-form-label">任务名称：</label><div class="layui-input-block"><input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入任务名称" class="layui-input set-w240"></div></div><div class="layui-form-item"><label class="layui-form-label">期号规则：</label><div class="layui-input-block pull-left mgl10 mgr10"><select name="mltt" lay-filter="mltt" lay-verify="required" lay-search="" class="set-w240"><option value="2">中奖自停</option><option value="1">一直追</option><option value="3">自定义</option></select></div></div><div class="layui-form-item" id="atk" style="display:none;"><label class="layui-form-label">追号期数：</label><div class="layui-input-block"><input type="text" name="mltn" autocomplete="off" placeholder="请输入追号期数" value="0" class="layui-input set-w240"></div></div><div class="layui-form-item"><label class="layui-form-label">金额规则：</label><div class="layui-input-block"><select name="mytt" lay-filter="mytt" lay-verify="required" lay-search="" class="set-w240"><option value="4">固定金额</option><option value="5">每期翻倍</option><option value="6">每期翻倍，中奖重置</option><option value="7">中奖减半</option><option value="8">奖金累加投注</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">规则描述：</label><div class="layui-input-block"><div class="pd5" id="desc"></div></div></div><div class="layui-form-item"><label class="layui-form-label">注意：</label><div class="layui-input-block"><div class="pd5"><span class=text-red>下一期才开始自动追号</span></div></div></div></div>'
          )
          .render({}, function (t) {
            layer.open({
              type: 1,
              title: '自动追号',
              closeBtn: 1,
              area: ['50%', '60%'],
              shadeClose: !1,
              skin: 'demo-class',
              btn: ['保存', '取消'],
              content: t,
              cancel: function () {},
              success: function () {
                var t = layui.$("select[name='mytt']").val(),
                  a = layui.$("select[name='mltt']").val()
                ;(layui.$('#desc').text(e[a + '_' + t]),
                  layui.$("select[name='mltt']").on('change', function () {
                    var t = layui.$(this).val(),
                      a = layui.$("select[name='mytt']").val()
                    ;(layui.$('#desc').text(e[t + '_' + a]), 3 == t ? layui.$('#atk').show() : layui.$('#atk').hide())
                  }),
                  layui.$("select[name='mytt']").on('change', function () {
                    var t = layui.$(this).val(),
                      a = layui.$("select[name='mltt']").val()
                    layui.$('#desc').text(e[a + '_' + t])
                  }))
              },
              yes: function (t, e) {
                var n = layui.$
                if ('' != n("input[name='title']").val()) {
                  var i = {}
                  ;((i['paramMap.csName'] = n("input[name='title']").val()), (i['paramMap.bRule'] = n("select[name='mltt']").val()), (i['paramMap.sRule'] = n("select[name='mytt']").val()), (i['paramMap.mltt'] = n("input[name='mltn']").val()))
                  var l = 0
                  ;(n.each(a, function (t, e) {
                    l += e.am
                  }),
                    (i['paramMap.betAmount'] = l),
                    (i['paramMap.betCount'] = a.length),
                    (i['paramMap.ctype'] = 1),
                    (i['paramMap.list'] = JSON.stringify(a)),
                    layui.utils.post('chaseNumber/saveChaseNumber', i, function (t) {
                      ;(layer.closeAll(), layui.utils.success("追号成功,<span class='text-red'>下一期才开始自动追号</span>！"), layui.chaseNumberList.render())
                    }))
                } else layui.utils.msg('追号任务名称不能为空')
              },
              btn2: function (t, e) {
                layer.closeAll(t)
              }
            })
          }))
    }
  })
}),
  layui.define(function (t) {
    var e = {
        1: '正常',
        2: '停用',
        3: '系统停用',
        4: '追号完成'
      },
      a = {}
    function n(t) {
      ;((a = t || {}),
        layui.utils.post('chaseNumber/chaseNubmerList', a, function (t) {
          var i = {}
          ;((i.list = t.list),
            (i.sts = e),
            layui
              .laytpl(
                '{{#layui.each(d.list,function(i,item){}}<tr><td>{{item.csName}}</td><td>{{item.betCount}}</td><td>{{layui.utils.numFormat(item.betAmount, 4)}}</td><td>{{item.createTime}}</td><td>{{item.updateTime || "--"}}</td><td>{{item.currLttnum}}</td><td><span class="{{item.csStatus==1?"text-green":"text-red"}}">{{d.sts[item.csStatus]}}</span></td><td><button data-id="{{ item.csId }}" class="btn btn-bg mgr5" name="show">查看</button>{{# if(item.csStatus==1){ }}<button data-id="{{ item.csId }}" class="btn btn-bg mgr5" name="stop">停用</button>{{# } }}<button data-id="{{ item.csId }}" class="btn btn-bg" name="del">删除</button></td></tr>{{#})}}{{ d.list.length==0 && "<tr><td colspan=8>没有自动任务</td></tr>" }}'
              )
              .render(i, function (t) {
                ;(layui.$('#at_tbody').html(t),
                  layui.$("button[name='show']", layui.main.container.content).click(function (t) {
                    var e = layui.$(this).attr('data-id'),
                      a = {}
                    ;((a['paramMap.csId'] = e), layui.chaseNumber.showDetail(a))
                  }),
                  layui.$("button[name='stop']", layui.main.container.content).click(function (t) {
                    var e = {},
                      i = layui.$(this).attr('data-id')
                    ;((e['paramMap.csId'] = i),
                      (e['paramMap.status'] = 2),
                      layui.utils.confirm(
                        '确认要停止该追号?停止后无法启用.',
                        function () {
                          layui.utils.post('chaseNumber/modifyStatus', e, function (t) {
                            ;(layui.utils.success('修改成功'), n(a))
                          })
                        },
                        '确认'
                      ))
                  }),
                  layui.$("button[name='del']", layui.main.container.content).click(function (t) {
                    var e = {},
                      i = layui.$(this).attr('data-id')
                    ;((e['paramMap.csId'] = i),
                      layui.utils.confirm(
                        '确认要删除该追号',
                        function () {
                          layui.utils.post('chaseNumber/delChaseNumber', e, function (t) {
                            ;(layui.utils.success('修改成功'), (a['paramMap.pageNum'] = 1), n(a))
                          })
                        },
                        '确认'
                      ))
                  }))
              }),
            (function (t) {
              layui.laypage.render({
                elem: 'page',
                curr: params['paramMap.pageNum'],
                count: t.rowCount,
                limit: params['paramMap.pageSize'],
                limits: [10, 20, 30, 50, 100, 200],
                layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
                jump: function (t, e) {
                  e || ((a['paramMap.pageNum'] = t.curr), (a['paramMap.pageSize'] = t.limit), n(a))
                }
              })
            })(t))
        }))
    }
    t('chaseNumberList', {
      render: function () {
        layui
          .laytpl(
            '<div class="panel panel-success"><form class="layui-form"><div class="panel-heading"><div class="panel-title text-center">检索条件</div></div><div class="panel-body">任务名称：<div class="layui-input-inline"><input type="text" name="paramMap.name" class="layui-input set-w240"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态：<div class="layui-input-inline set-w90"><select name="paramMap.st"><option value="">全部</option><option value="1">正常</option><option value="2">停用</option><option value="3">系统停用</option><option value="4">追号完成</option></select></div><button class="btn btn-bg mgl15" lay-submit="" lay-filter="submitBtn">&nbsp;查询</button></div></form></div><div class="panel panel-success mgt15"><div class="panel-heading clearfix"><div class="panel-title text-center">自动任务列表</div></div><div class="panel-body pd0"><table class="table table-bd mg0 table-hover"><thead><tr><th>任务名称</th><th>号码个数</th><th>总金额</th><th>创建时间</th><th>修改时间</th><th>追号期数</th><th>状态</th><th>操作</th></tr></thead><tbody id="at_tbody"></tbody></table><div class="clearfix pdt5 pdr15"><div id="page" class="pull-right"></div></div></div></div>'
          )
          .render({}, function (t) {
            ;(layui.main.container.content.html(t),
              layui.form.render(),
              n({}),
              layui.form.on('submit(submitBtn)', function (t) {
                return ((a['paramMap.name'] = t.field['paramMap.name']), (a['paramMap.status'] = t.field['paramMap.st']), (a['paramMap.pageNum'] = 1), n(a), !1)
              }))
          })
      }
    })
  }),
  layui.define(function (t) {
    var e = layui.$,
      a = layui.laytpl,
      n = layui.form,
      i = ''
    function l(t) {
      ;(game_loading_wrap(!1), r(t))
      var a = ["<div  class='t_1' style='max-height: 500px;min-height: 370px'> <span id='kxlog' style='display: none'></span> <div id='kxnumbers' class='history_wrap' style='max-height: 500px;min-height: 370px'>"]
      ;(a.push('</div></div>'), e('#gameBox').html(a.join('')))
      ;(e('#gameBoxTool').html(
        "<div class='tool_left'><div id='tool_ys_wrap' class='t_left'><label for='tool_ys_input'>下注金额：</label><input id='tool_ys_input' class='input onlyNum' maxlength='5' type='text'>&nbsp;&nbsp;<input id='kxSubmit' class='btn hotBtn disSubmit' type='button' value='提交'> &nbsp;&nbsp;笔数：<span id='zbishu' style='color: #ff0000'></span> &nbsp;&nbsp;金额：<span id='zmoney' style='color: #ff0000'></span></div></div>"
      ),
        e('#tool_ys_input').keyup(function () {
          var t = e('#zbishu').html()
          t.length > 0 && e(this).val().length > 0 ? e('#zmoney').html(Math.round(t) * parseFloat(e(this).val())) : e('#zmoney').html('')
        }),
        e('#kxSubmit')
          .unbind('click')
          .click(function () {
            var t = e('#tool_ys_input').val()
            if (!(0 == t.length || parseFloat(t) <= 0)) {
              var a = []
              if (
                (e('#kxnumbers')
                  .find('td')
                  .each(function () {
                    var n = e(this).html(),
                      i = getDWTypeByName(n)
                    i > 0 && a.push(i + ':' + t)
                  }),
                0 != a.length)
              )
                if (a.length > 1e4) layui.utils.msg('单笔最大只能下注10000注')
                else {
                  var n = e('#menuText').attr('data-index'),
                    i = e('#NowJq').html()
                  a.sort(function (t, e) {
                    var a = t.split(':')[0],
                      n = e.split(':')[0]
                    return Math.round(n) - Math.round(a)
                  })
                  0 != e('#tool_ys_input').val().length &&
                    (e('#tool_ys_input').val(''),
                    dataSubmit(
                      {
                        gameIndex: n,
                        betType: 4,
                        data: e('#kxlog').html(),
                        number: i,
                        sortAry: a.join(',')
                      },
                      !1,
                      null,
                      []
                    ))
                }
            }
          }),
        e('#tool_ys_input').bind('keypress', function (t) {
          if ('13' == t.keyCode) {
            var a = e('#tool_ys_input').val()
            if (0 == a.length || parseFloat(a) <= 0) return
            var n = []
            if (
              (e('#kxnumbers')
                .find('td')
                .each(function () {
                  var t = e(this).html(),
                    i = getDWTypeByName(t)
                  i > 0 && n.push(i + ':' + a)
                }),
              0 == n.length)
            )
              return
            if (n.length > 1e4) return void layui.utils.msg('单笔最大只能下注10000注')
            var i = e('#menuText').attr('data-index'),
              l = e('#NowJq').html()
            n.sort(function (t, e) {
              var a = t.split(':')[0],
                n = e.split(':')[0]
              return Math.round(n) - Math.round(a)
            })
            if (0 == e('#tool_ys_input').val().length) return
            ;(e('#tool_ys_input').val(''),
              dataSubmit(
                {
                  gameIndex: i,
                  betType: 4,
                  data: e('#kxlog').html(),
                  number: l,
                  sortAry: n.join(',')
                },
                !1,
                null,
                []
              ))
          }
        }))
    }
    function r(t) {
      var e = 1 == t ? '一' : 2 == t ? '二' : 3 == t ? '三' : '四',
        a = ['<table>']
      if (
        (a.push('<tbody>'),
        a.push(
          "<tr class='position-filter' > <td  colspan='2' > <strong class='red2'>定位置</strong> <label><input type='checkbox' lay-skin='primary' positiontype='0' name='position' positionfilter='1' >除</label> <label><input type='checkbox' name='position' lay-skin='primary' positiontype='0' positionfilter='0'  checked='checked'>取</label> </td> <td  colspan='3' > <strong class='red2'>配数全转</strong> <label><input positiontype='1' positionfilter='1' name='pei' type='checkbox' lay-skin='primary'>除</label> <label><input positiontype='1' name='pei' positionfilter='0' type='checkbox' lay-skin='primary'>取</label> </td> </tr>"
        ),
        a.push("<tr class='fixed-input'>"),
        a.push("<td width='20%'>千</td>"),
        a.push("<td width='20%'>百</td>"),
        a.push("<td width='20%'>十</td>"),
        a.push('</tr>'),
        a.push("<tr class='fixed-input'>"),
        a.push("<td><input name='wan' autocomplete='off' class='input input2 layui-input set-w120 input-center'  type='text'></td>"),
        a.push("<td><input name='qian' autocomplete='off' class='input input2 layui-input set-w120 input-center' type='text'></td>"),
        a.push("<td><input name='bai' autocomplete='off' class='input input2 layui-input set-w120 input-center'  type='text'></td>"),
        a.push('</tr>'),
        a.push("<tr class='match-input' style='display: none'>"),
        a.push("<td colspan='3'>"),
        a.push(" <div class='layui-input-inline'><input name='pei1' autocomplete='off' class='input input2 layui-input set-w120'  type='text'></div> "),
        t >= 2 && a.push("配 <div class='layui-input-inline'><input name='pei2' autocomplete='off' class='input input2 layui-input set-w120'  type='text'></div>"),
        t >= 3 && a.push(" 配<div class='layui-input-inline'> <input name='pei3' autocomplete='off' class='input input2 layui-input set-w120'  type='text'></div>"),
        a.push('</td>'),
        a.push('</tr>'),
        t > 1 &&
          (a.push(
            "<tr class='hefen-filter'> <td colspan='3'> <strong class='red2'>合</strong>&nbsp;&nbsp; <strong class='red2'>分</strong> <label><input lay-skin='primary' type='checkbox' hefentype='1'>除</label> <label><input  lay-skin='primary' type='checkbox' hefentype='0'  checked='checked'>取</label> </td> </tr>"
          ),
          a.push('<tr>'),
          a.push("<td class='hefen-filter-item'> 1. <input type='checkbox' lay-skin='primary'> <input type='checkbox' lay-skin='primary'> <input type='checkbox' lay-skin='primary'> <br> <input type='text' class='input input2 layui-input set-w120 input-center'  maxlength='10'> </td>"),
          a.push("<td class='hefen-filter-item'> 2. <input type='checkbox' lay-skin='primary'> <input type='checkbox' lay-skin='primary'> <input type='checkbox' lay-skin='primary'> <br> <input type='text' class='input input2 layui-input set-w120 input-center'  maxlength='10'> </td>"),
          a.push("<td class='hefen-filter-item'> 3. <input type='checkbox' lay-skin='primary'> <input type='checkbox' lay-skin='primary'> <input type='checkbox' lay-skin='primary'> <br> <input type='text' class='input input2 layui-input set-w120 input-center'  maxlength='10'> </td>"),
          a.push('</tr>')),
        t > 1)
      ) {
        var n = 5
        ;(4 == t && (n = 2),
          a.push('<tr>'),
          a.push("<td class='budinghe-filter' style='text-align: left' colspan='" + n + "' ><strong class='red2'>不定位合分</strong> <label><input type='checkbox' budinghetype='2' lay-skin='primary'>两数合</label> "),
          (3 != t && 4 != t) || a.push("<label><input type='checkbox' lay-skin='primary' budinghetype='3'  >三数合</label>"),
          a.push("<div class='layui-input-inline'><input type='text' class='input input2 layui-input set-w120' maxlength='10'></div>"),
          a.push('</tr>'))
      }
      return (
        a.push('<tr>'),
        a.push("<td colspan='3' style='text-align: left'>"),
        a.push("<strong class='red2'>全转</strong><div class='layui-input-inline'> <input type='text' class='input input2 layui-input set-w120' name='quanzhuan' maxlength=\"10\"></div>"),
        a.push("&nbsp;<strong class='red2'>上奖</strong> <div class='layui-input-inline'><input type='text' class='input input2 layui-input set-w120' name='shangjiang' maxlength=\"10\"></div>"),
        a.push("&nbsp;<strong class='red2'>排除</strong> <div class='layui-input-inline'><input type='text' class='input input2 layui-input set-w120' name='paichu' maxlength=\"10\"></div>"),
        4 != t &&
          a.push(
            "&nbsp;<strong class='red2'>乘号位置</strong><input type='checkbox' lay-skin='primary' class='symbol-filter-item' name='0'>&nbsp;<input type='checkbox' lay-skin='primary' class='symbol-filter-item' name='1'>&nbsp;<input type='checkbox' lay-skin='primary' class='symbol-filter-item' name='2'>"
          ),
        a.push('</td>'),
        a.push('</tr>'),
        a.push('<tr>'),
        a.push("<td colspan='3' class='contain-filter' style='text-align: left'>"),
        a.push("<label><input type='checkbox' lay-skin='primary' containfilter='1' >&nbsp;除</label>"),
        a.push("&nbsp;<label><input type='checkbox' lay-skin='primary' containfilter='0' >&nbsp;取</label>"),
        a.push(' ' + e + "字定含 <div class='layui-input-inline'><input type='text' class='input input2 layui-input set-w120' name='han' maxlength='10'></div>"),
        t > 1 && a.push(' ' + e + "字定复式<div class='layui-input-inline'> <input type='text' class='input input2 layui-input set-w120' name='fushi' maxlength='10'></div>"),
        a.push('</td>'),
        a.push('</tr>'),
        a.push('<tr>'),
        a.push("<td colspan='3' style='text-align: left'>"),
        t > 1 &&
          (a.push("<label><input type='checkbox' lay-skin='primary' lay-filter='borther' class='repeat-two-words-filter' repeatwordsfilter='1' >&nbsp;除</label>"),
          a.push("&nbsp;<label><input type='checkbox' lay-skin='primary' lay-filter='borther' class='repeat-two-words-filter' repeatwordsfilter='0'>&nbsp;取</label>"),
          a.push("(<strong class='red2'>双重</strong>)")),
        4 == t &&
          (a.push("&nbsp;&nbsp;<label><input type='checkbox' lay-filter='borther' lay-skin='primary' class='repeat-double-words-filter' repeatwordsfilter='1' >&nbsp;除</label>"),
          a.push("&nbsp;<label><input type='checkbox' lay-filter='borther' lay-skin='primary' class='repeat-double-words-filter' repeatwordsfilter='0' >&nbsp;取</label>"),
          a.push("(<strong class='red2'>双双重</strong>)")),
        t >= 3 &&
          (a.push("&nbsp;&nbsp;<label><input type='checkbox' lay-filter='borther' lay-skin='primary' class='repeat-three-words-filter' repeatwordsfilter='1'>&nbsp;除</label>"),
          a.push("&nbsp;<label><input type='checkbox' lay-filter='borther' lay-skin='primary' class='repeat-three-words-filter' repeatwordsfilter='0'>&nbsp;取</label>"),
          a.push("(<strong class='red2'>三重</strong>)")),
        a.push('</td>'),
        a.push('</tr>'),
        a.push('<tr>'),
        a.push("<td colspan='3' style='text-align: left'>"),
        t > 1 &&
          (a.push("<label><input class='two-brother-filter' lay-filter='borther' brotherfilter='1' type='checkbox' lay-skin='primary' >&nbsp;除</label>"),
          a.push("&nbsp;<label><input class='two-brother-filter' lay-filter='borther' brotherfilter='0' type='checkbox' lay-skin='primary' >&nbsp;取</label>"),
          a.push("(<strong class='red2'>二兄弟</strong>)")),
        t >= 3 &&
          (a.push("&nbsp;&nbsp;<label><input class='three-brother-filter' lay-filter='borther' brotherfilter='1' type='checkbox' lay-skin='primary'>&nbsp;除</label>"),
          a.push("&nbsp;<label><input class='three-brother-filter' lay-filter='borther' brotherfilter='0' type='checkbox' lay-skin='primary'>&nbsp;取</label>"),
          a.push("(<strong class='red2'>三兄弟</strong>)")),
        a.push('</td>'),
        a.push('</tr>'),
        t > 1 &&
          (a.push('<tr>'),
          a.push("<td colspan='5' style='text-align: left'>"),
          a.push("<label><input class='logarithm-number-filter' lay-filter='borther' logarithmnumberfilter='1' type='checkbox' lay-skin='primary'>&nbsp;除</label>"),
          a.push("&nbsp;<label><input class='logarithm-number-filter' lay-filter='borther' logarithmnumberfilter='0' type='checkbox' lay-skin='primary'>&nbsp;取</label>"),
          a.push("(<strong class='red2'>对数</strong>)"),
          a.push("&nbsp;<div class='layui-input-inline'><input type='text' class='input input2 layui-input set-w120' name='duishu1'  maxlength='2'></div>"),
          a.push("&nbsp;<div class='layui-input-inline'><input type='text' class='input input2 layui-input set-w120' name='duishu2'  maxlength='2'></div>"),
          a.push("&nbsp;<div class='layui-input-inline'><input type='text' class='input input2 layui-input set-w120' name='duishu3'  maxlength='2'></div>"),
          a.push('</td>'),
          a.push('</tr>')),
        a.push('<tr>'),
        a.push("<td colspan='3' style='text-align: left'>"),
        a.push("<label><input type='checkbox' lay-skin='primary' lay-filter='borther' class='odd-number-filter' oddnumberfilter='1'>&nbsp;除</label>"),
        a.push("&nbsp;<label><input type='checkbox' lay-skin='primary' lay-filter='borther' class='odd-number-filter' oddnumberfilter='0'>&nbsp;取</label>"),
        a.push("(<strong class='red2'>单</strong>)"),
        a.push("&nbsp;<input type='checkbox' lay-skin='primary' class='odd-number-item'>&nbsp;<input type='checkbox' lay-skin='primary' class='odd-number-item'>&nbsp;<input type='checkbox' lay-skin='primary' class='odd-number-item'>"),
        a.push(" &nbsp;&nbsp;&nbsp;&nbsp;<label><input class='even-number-filter' lay-filter='borther' evennumberfilter='1' type='checkbox' lay-skin='primary'>&nbsp;除</label>"),
        a.push("&nbsp;<label><input type='checkbox' class='even-number-filter' lay-filter='borther' lay-skin='primary' evennumberfilter='0'>&nbsp;取</label>"),
        a.push("(<strong class='red2'>双</strong>)"),
        a.push("&nbsp;<input type='checkbox' lay-skin='primary' class='even-number-item'>&nbsp;<input type='checkbox' lay-skin='primary' class='even-number-item'>&nbsp;<input type='checkbox' lay-skin='primary' class='even-number-item'>"),
        a.push('</td>'),
        a.push('</tr>'),
        a.push("<tr><td colspan='3'>"),
        a.push("<input name='create-number' class='layui-btn layui-btn-normal layui-btn-small mgr10' lay-filter='submitPro' type='button' value='生成'>"),
        a.push("&nbsp;&nbsp;<input name='reset-number' class='layui-btn layui-btn-normal layui-btn-small' type='button' value='重置'>"),
        a.push('</td></tr>'),
        a.push('</tbody>'),
        a.push('</table>'),
        a.join('')
      )
    }
    t('gamemiddle', {
      kuaixian: l,
      kxcontent: r,
      kuaiXuanClick: function t() {
        ;(e("#kx_content input[type='text']").keyup(function () {
          e(this).val(
            e(this)
              .val()
              .replace(/[^0-9]/g, '')
          )
        }),
          e('#kx_content tr.position-filter input')
            .unbind('change')
            .change(function () {
              var t = e(this).attr('positiontype')
              e(this).attr('positionfilter')
              ;(e('#kx_content tr.position-filter input').prop('checked', !1),
                e(this).prop('checked', 'checked'),
                0 == t
                  ? (e('#kx_content tr.fixed-input').attr('style', ''), e('#kx_content tr.match-input').attr('style', 'display: none'), e("#kx_content tr.match-input input[type='text']").val(''))
                  : (e('#kx_content tr.fixed-input').attr('style', 'display: none'), e('#kx_content tr.match-input').attr('style', ''), e("#kx_content tr.fixed-input input[type='text']").val('')),
                n.render('checkbox'))
            }),
          e('#kx_content tr.hefen-filter input')
            .unbind('change')
            .change(function () {
              ;(e('#kx_content tr.hefen-filter input').prop('checked', !1), e(this).prop('checked', !0), n.render('checkbox'))
            }),
          e("#kx_content td.budinghe-filter input[type='checkbox']")
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e("#kx_content td.budinghe-filter input[type='checkbox']").prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e("#kx_content td.contain-filter input[type='checkbox']")
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e("#kx_content td.contain-filter input[type='checkbox']").prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content  input.repeat-two-words-filter')
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.repeat-two-words-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content input.repeat-three-words-filter')
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.repeat-three-words-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content input.repeat-four-words-filter')
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.repeat-four-words-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content input.repeat-double-words-filter')
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.repeat-double-words-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content input.two-brother-filter')
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.two-brother-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content input.three-brother-filter')
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.three-brother-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content input.four-brother-filter')
            .unbind('change')
            .change(function () {
              ;('checked' == e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.four-brother-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content input.logarithm-number-filter')
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.logarithm-number-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content input.odd-number-filter')
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.odd-number-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e('#kx_content input.even-number-filter')
            .unbind('change')
            .change(function () {
              ;(e(this).prop('checked') ? e(this).prop('checked', !1) : (e('#kx_content input.even-number-filter').prop('checked', !1), e(this).prop('checked', !0)), n.render('checkbox'))
            }),
          e("#kx_content input[name='reset-number']")
            .unbind('click')
            .click(function () {
              var i = e('#type a.active').attr('data'),
                l = r('one' == i ? 1 : 'two' == i ? 2 : 'three' == i ? 3 : 4)
              ;(e('#proNums').html(''),
                e("span[name='lotTCount']").text(''),
                e("span[name='lotTMoney']").text(''),
                a(l).render({}, function (a) {
                  ;(e('#kx_content').html(a), t(), n.render())
                }))
            }),
          n.on('checkbox(fiveDing)', function (t) {
            if ('four' == e('#type a.active').attr('data')) {
              for (var a = document.getElementsByName('dw5zi'), i = 0; i < a.length; i++) a[i].checked = !1
              ;(e(this).prop('checked', 'checked'), n.render('checkbox'))
            }
          }),
          e("#kx_content input[name='create-number']")
            .unbind('click')
            .click(function () {
              var t = e('#kx_content tr.position-filter input:checked').attr('positiontype'),
                a = e('#kx_content tr.position-filter input:checked').attr('positionfilter'),
                n = e('#type a.active').attr('data'),
                l = 'one' == n ? 1 : 'two' == n ? 2 : 3,
                r = [],
                o = [],
                s = !1,
                u = []
              if (0 == t) {
                var p = e("#kx_content tr.fixed-input input[name='wan']").val(),
                  d = e("#kx_content tr.fixed-input input[name='qian']").val(),
                  c = e("#kx_content tr.fixed-input input[name='bai']").val(),
                  f = [p, d, c],
                  h = []
                if ((p.length > 0 && h.push(0), d.length > 0 && h.push(1), c.length > 0 && h.push(2), h.length > 0 && ((s = !0), r.push('1|' + a + '|' + f.join(':'))), l == h.length)) {
                  if (((o = layui.globals.dwcreatenumber(l, f, h)), 1 == a)) {
                    for (var m = ['', '', ''], y = 0; y < h.length; y++) m[h[y]] = '0123456789'
                    u = layui.globals.dwcreatenumber(l, m, h)
                  }
                } else if (h.length > 0 && h.length < l) {
                  var g
                  if (1 == l) g = [0, 1, 2]
                  else if (2 == l)
                    g = [
                      [0, 1],
                      [0, 2],
                      [1, 2]
                    ]
                  else if (3 == l) g = [[0, 1, 2]]
                  else if (4 == l) {
                    g = [
                      (g = [
                        [0, 1, 2, 3],
                        [0, 1, 2, 4],
                        [0, 1, 3, 4],
                        [0, 2, 3, 4],
                        [1, 2, 3, 4]
                      ])[(lt = [4, 3, 2, 1, 0])[-1]]
                    ]
                  }
                  for (var b = 0; b < g.length; b++) {
                    m = f
                    var v = g[b],
                      O = !1
                    for (y = 0; y < h.length; y++)
                      if (-1 == v.indexOf(h[y])) {
                        O = !0
                        break
                      }
                    if (!O) {
                      var X = ['', '', '']
                      for (y = 0; y < v.length; y++) (0 == m[v[y]].length && (m[v[y]] = '0123456789'), 1 == a && (X[v[y]] = '0123456789'))
                      ;((o = o.concat(layui.globals.dwcreatenumber(l, m, v))), 1 == a && (u = u.concat(layui.globals.dwcreatenumber(l, X, v))))
                    }
                  }
                }
              } else {
                var x = [],
                  k = []
                for (b = 1; b <= l; b++) {
                  var w = e("#kx_content tr.match-input input[name='pei" + b + "']").val()
                  ;(w.length > 0 && ((s = !0), k.push(w)), x.push(0 == w.length ? '0123456789' : w))
                }
                s && (1 == a && (u = layui.globals.getNumbersByCategory(l, 0)), (o = layui.globals.peishuquanzhuan(l, x, 0, !1)), r.push('2|' + a + '|' + k.join(':')))
              }
              if (1 == a) {
                var M = []
                for (y = 0; y < u.length; y++) -1 == o.indexOf(u[y]) && M.push(u[y])
                o = M
              }
              var _ = e("#kx_content input[name='quanzhuan']").val()
              if (_.length > 0) {
                if (((S = []), _.length >= l)) {
                  var j = []
                  for (b = 0; b < l; b++) j.push(_)
                  S = layui.globals.peishuquanzhuan(l, j, 0, !0)
                }
                if (0 == o.length && s) o = []
                else if (0 == o.length) o = S
                else {
                  var T = []
                  for (b = 0; b < S.length; b++) -1 != o.indexOf(S[b]) && T.push(S[b])
                  o = T
                }
                ;((s = !0), r.push('3|' + _))
              }
              var N = e("#kx_content input[name='shangjiang']").val()
              if (N.length > 0) {
                u = layui.globals.getNumbersByCategory(l, 0)
                var S = []
                for (y = 0; y < u.length; y++) {
                  for (var A = u[y], C = [], $ = 0; $ < A.length; $++)
                    for (var K = 0; K < N.length; K++)
                      if (A[$] == N[K] && -1 == C.indexOf(K)) {
                        C.push(K)
                        break
                      }
                  ;((C = C.uniquelize()).length != N.length && C.length != l) || S.push(A)
                }
                ;(s || 0 != _.length ? o.length > 0 && (o = 0 == S.length ? [] : Array.intersect(o, S)) : (o = S), (s = !0), r.push('4|' + N))
              }
              if (4 == l) {
                var L = e("#kx_content td.zhi-filter-range input[name='zhifanwei1']").val(),
                  D = e("#kx_content td.zhi-filter-range input[name='zhifanwei2']").val()
                if (L.length > 0 && D.length > 0) {
                  if (((S = []), s || 0 != _.length || 0 != N.length)) {
                    if (o.length > 0) {
                      for (b = 0; b < o.length; b++) {
                        ;((A = (A = o[b]).replace(/X/g, '')), (F = Math.round(A[0]) + Math.round(A[1]) + Math.round(A[2]) + Math.round(A[3])) >= Math.round(L) && F <= Math.round(D) && S.push(o[b]))
                      }
                      o = S
                    }
                  } else {
                    u = layui.globals.getNumbersByCategory(l, 0)
                    for (var b = 0; b < u.length; b++) {
                      var F
                      ;((A = (A = u[b]).replace(/X/g, '')), (F = Math.round(A[0]) + Math.round(A[1]) + Math.round(A[2]) + Math.round(A[3])) >= Math.round(L) && F <= Math.round(D) && S.push(u[b]))
                    }
                    o = S
                  }
                  ;((s = !0), r.push('5|' + L + '~' + D))
                }
              }
              var I = e('#kx_content tr.hefen-filter input:checked').attr('hefentype'),
                q = []
              e('#kx_content td.hefen-filter-item').each(function () {
                var t = e(this).find("input[type='text']").val()
                if ('' == t) return !0
                var a = 0,
                  n = []
                ;(e(this)
                  .find("input[type='checkbox']")
                  .each(function () {
                    ;(e(this).prop('checked') && n.push(a), a++)
                  }),
                  n.length > 0 && q.push(n.join(':') + '-' + t))
              })
              S = []
              if (q.length > 0) {
                s || (o = layui.globals.getNumbersByCategory(l, 0))
                for (b = 0; b < o.length; b++) {
                  var B = 0
                  for (y = 0; y < q.length; y++) {
                    var E = q[y].split('-')[1],
                      R = q[y].split('-')[0].split(':'),
                      z = 0
                    for ($ = 0; $ < R.length; $++) {
                      if ('X' == o[b][R[$]]) {
                        z = -1
                        break
                      }
                      z += Math.round(o[b][R[$]])
                    }
                    if (!(z < 0))
                      for (K = 0; K < E.length; K++)
                        if (z % 10 == E[K]) {
                          B++
                          break
                        }
                  }
                  ;((B == q.length && 0 == I) || (B != q.length && 1 == I)) && S.push(o[b])
                }
                ;((o = S), (s = !0), r.push('6|' + I + '|' + q.join(';')))
              }
              var P = e('#kx_content td.budinghe-filter input[type=checkbox]:checked').attr('budinghetype'),
                U = e("#kx_content td.budinghe-filter input[type='text']").val()
              if ((2 == P || 3 == P) && U.length > 0) {
                ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (S = []))
                for (b = 0; b < o.length; b++) {
                  A = (A = o[b]).replace('/X/g', '')
                  var H = !1
                  for (y = 0; y < A.length; y++) {
                    for ($ = y + 1; $ < A.length; $++) {
                      if (2 == P) {
                        var J = (Math.round(A[y]) + Math.round(A[$])) % 10
                        if (-1 != U.indexOf(J)) {
                          ;(S.push(o[b]), (H = !0))
                          break
                        }
                      } else
                        for (K = $ + 1; K < A.length; K++) {
                          J = (Math.round(A[y]) + Math.round(A[$]) + Math.round(A[K])) % 10
                          if (-1 != U.indexOf(J)) {
                            ;(S.push(o[b]), (H = !0))
                            break
                          }
                        }
                      if (H) break
                    }
                    if (H) break
                  }
                }
                ;((o = S), (s = !0), r.push('7|' + P + '|' + U))
              }
              var W = e("#kx_content input[name='paichu']").val()
              if (W.length > 0) {
                ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (S = []))
                for (b = 0; b < o.length; b++) {
                  A = o[b]
                  var Y = !1
                  for (y = 0; y < W.length; y++)
                    if (-1 != A.indexOf(W[y])) {
                      Y = !0
                      break
                    }
                  Y || S.push(A)
                }
                ;((o = S), (s = !0), r.push('8|' + W))
              }
              var G = []
              if (
                (e('#kx_content input.symbol-filter-item:checked').each(function () {
                  G.push(e(this).attr('name'))
                }),
                G.length > 0 && 4 != l)
              ) {
                ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (S = []))
                for (b = 0; b < o.length; b++) {
                  A = o[b]
                  Y = !0
                  for (y = 0; y < G.length; y++)
                    if ('X' != A[G[y]]) {
                      Y = !1
                      break
                    }
                  Y && S.push(A)
                }
                ;((o = S), (s = !0), r.push('9|' + G.join(':')))
              }
              var V = e("#kx_content td.contain-filter input[type='checkbox']:checked").attr('containfilter'),
                Z = e("#kx_content td.contain-filter input[name='han']").val(),
                Q = e("#kx_content td.contain-filter input[name='fushi']").val()
              if (((Q = null == Q ? '' : Q), V >= 0 && Z.length > 0)) {
                ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (S = []))
                for (b = 0; b < o.length; b++) {
                  A = o[b]
                  Y = !1
                  for (y = 0; y < Z.length; y++)
                    if (-1 != A.indexOf(Z[y])) {
                      Y = !0
                      break
                    }
                  0 == V && Y ? S.push(A) : 1 != V || Y || S.push(A)
                }
                ;((o = S), (s = !0), r.push('10|' + V + '|' + Z))
              }
              if (V >= 0 && Q.length > 0) {
                ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (S = []))
                for (b = 0; b < o.length; b++) {
                  A = o[b]
                  Y = !0
                  for (y = 0; y < A.length; y++)
                    if ('X' != A[y] && -1 == Q.indexOf(A[y])) {
                      Y = !1
                      break
                    }
                  0 == V && Y ? S.push(A) : 1 != V || Y || S.push(A)
                }
                ;((o = S), (s = !0), r.push('11|' + V + '|' + Q))
              }
              var tt = ['two', 'three', 'four', 'double'],
                et = l < 4 ? l - 1 : l,
                at = []
              for (y = 0; y < et; y++) {
                var nt = e("#kx_content  input[class='repeat-" + tt[y] + "-words-filter']:checked").attr('repeatwordsfilter')
                nt >= 0 && at.push(y + ':' + nt)
              }
              if (at.length > 0) {
                ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (s = !0), (S = []))
                for (b = 0; b < o.length; b++) {
                  for (A = o[b], Y = !0, y = 0; y < at.length; y++) {
                    var it = at[y],
                      lt = Math.round(it.split(':')[0]),
                      rt = Math.round(it.split(':')[1])
                    B = layui.globals.chong(A)
                    if ((0 == lt && 0 == rt && B < 2 && (Y = !1), 0 == lt && 1 == rt && B >= 2 && (Y = !1), 0 == lt && rt >= 0 && !Y)) break
                    if (l >= 3 && (1 != lt || 0 != rt || (B >= 3 && B <= 4) || (Y = !1), 1 == lt && 1 == rt && B >= 3 && B <= 4 && (Y = !1), 1 == lt && rt >= 0 && !Y)) break
                    if (4 == l) {
                      if ((3 != lt || 0 != rt || (B >= 4 && B <= 5) || (Y = !1), 3 == lt && 1 == rt && B >= 4 && B <= 5 && (Y = !1), 3 == lt && rt >= 0 && !Y)) break
                      if ((2 == lt && 0 == rt && 4 != B && (Y = !1), 2 == lt && 1 == rt && 4 == B && (Y = !1), 2 == lt && rt >= 0 && !Y)) break
                    }
                  }
                  Y && S.push(A)
                }
                ;((o = S), r.push('12|' + at.join('|')))
              }
              if (l > 1) {
                var ot = e("#kx_content input[class='logarithm-number-filter']:checked").attr('logarithmnumberfilter'),
                  st = []
                for (y = 1; y <= 3; y++) {
                  var ut = e("#kx_content input[name='duishu" + y + "'] ").val()
                  if (2 != ut.length || (ut[0] - ut[1] != 5 && ut[0] - ut[1] != -5)) {
                    if (ut.length > 0) return void layui.utils.msg('请输入差值为5的数')
                  } else st.push(ut)
                }
                if (ot >= 0 && st.length > 0) {
                  ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (s = !0), (S = []))
                  for (b = 0; b < o.length; b++) {
                    ;((A = o[b]), (Y = !1))
                    for (y = 0; y < st.length; y++)
                      if (-1 != A.indexOf(st[y][0]) && -1 != A.indexOf(st[y][1])) {
                        Y = !0
                        break
                      }
                    ;(1 == ot && (Y = !Y), Y && S.push(A))
                  }
                  ;((o = S), r.push('13|' + ot + '|' + st.join(':')))
                } else if (ot >= 0 && 0 == st.length) {
                  ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (s = !0), (S = []))
                  for (b = 0; b < o.length; b++) {
                    ;((A = (A = o[b]).replace(/X/g, '')), (Y = !1))
                    for (y = 0; y < A.length - 1; y++)
                      for ($ = y + 1; $ < A.length; $++)
                        if (A[y] - A[$] == 5 || A[y] - A[$] == -5) {
                          Y = !0
                          break
                        }
                    ;(1 == ot && (Y = !Y), Y && S.push(o[b]))
                  }
                  ;((o = S), r.push('13|' + ot + '| '))
                }
              }
              var pt = ['two', 'three', 'four'],
                dt = []
              for (y = 0; y < l - 1; y++) {
                var ct = e("#kx_content input[class='" + pt[y] + "-brother-filter']:checked").attr('brotherfilter')
                ct >= 0 && dt.push(y + ':' + ct)
              }
              if (dt.length > 0) {
                ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (s = !0), (S = []))
                for (b = 0; b < o.length; b++) {
                  ;((A = o[b]), (Y = !0))
                  for (var ft = 0; ft < dt.length; ft++) {
                    ;((lt = dt[ft].split(':')[0]), (rt = dt[ft].split(':')[1]))
                    if (
                      (0 == lt && 0 == rt && layui.globals.brother(A) < 2 && (Y = !1),
                      0 == lt && 1 == rt && layui.globals.brother(A) >= 2 && (Y = !1),
                      1 == lt && 0 == rt && layui.globals.brother(A) < 3 && (Y = !1),
                      1 == lt && 1 == rt && layui.globals.brother(A) >= 3 && (Y = !1),
                      2 == lt && 0 == rt && 4 != layui.globals.brother(A) && (Y = !1),
                      2 == lt && 1 == rt && 4 == layui.globals.brother(A) && (Y = !1),
                      !Y)
                    )
                      break
                  }
                  Y && S.push(A)
                }
                ;((o = S), r.push('14|' + dt.join('|')))
              }
              var ht = e("#kx_content input[class='odd-number-filter']:checked").attr('oddnumberfilter'),
                mt = e("#kx_content input[class='even-number-filter']:checked").attr('evennumberfilter'),
                yt = [],
                gt = [],
                bt = 0
              if (
                (e("#kx_content input[class='odd-number-item']").each(function () {
                  ;(e(this).prop('checked') && yt.push(bt), bt++)
                }),
                ht >= 0 && yt.length > 0)
              ) {
                ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (s = !0), (S = []))
                for (b = 0; b < o.length; b++) {
                  for (A = o[b], Y = !0, y = 0; y < yt.length; y++)
                    if ('X' == A[yt[y]] || Math.round(A[yt[y]]) % 2 == 0) {
                      Y = !1
                      break
                    }
                  ;(1 == ht && (Y = !Y), Y && S.push(A))
                }
                ;((o = S), r.push('15|' + ht + '|' + yt.join('|')))
              }
              if (
                ((bt = 0),
                e("#kx_content input[class='even-number-item']").each(function () {
                  ;(e(this).prop('checked') && gt.push(bt), bt++)
                }),
                mt >= 0 && gt.length > 0)
              ) {
                ;(s || (o = layui.globals.getNumbersByCategory(l, 0)), (s = !0), (S = []))
                for (b = 0; b < o.length; b++) {
                  for (A = o[b], Y = !0, y = 0; y < gt.length; y++)
                    if ('X' == A[gt[y]] || Math.round(A[gt[y]]) % 2 != 0) {
                      Y = !1
                      break
                    }
                  ;(1 == mt && (Y = !Y), Y && S.push(A))
                }
                ;((o = S), r.push('16|' + mt + '|' + gt.join('|')))
              }
              if (!s) return (layui.utils.msg('请选择或填写条件生成！。'), (o = []), (selelog = ''), void e('#proNums').html(''))
              if (0 == o.length) e('#proNums').html("<tr><td colspan='6'>没有这样的号码</td></tr>")
              else {
                o = o.sort()
                var vt = Math.round(o.length / 10)
                o.length % 10 > 0 && (vt += 1)
                var Ot = []
                ;(Ot.push('<table >'), Ot.push('<tbody >'))
                for (y = 0; y < vt; y++) {
                  Ot.push('<tr>')
                  for ($ = 0; $ < 10; $++)
                    if (10 * y + $ < o.length) {
                      var Xt = o[10 * y + $]
                      Ot.push('<td >' + ('X' == Xt[4] ? Xt.substring(0, Xt.lastIndexOf('X')) : Xt) + '</td>')
                    }
                  Ot.push('</tr>')
                }
                ;(Ot.push('</tbody>'), Ot.push('</table>'), e('#proNums').html(Ot.join('')), e('#kxlog').html(l + ',0,' + r.join(',')), e('#zbishu').html(o.length), e("span[name='lotTCount']").text(null == o ? 0 : o.length))
                var xt = e("input[name='ltMoy']").val()
                ;('' != xt && null != o && e("span[name='lotTMoney']").text(xt * o.length), e("input[name='ltMoy']").focus(), (selelog = ''), (i = layui.gamemiddle.positionLog()))
              }
            }))
      },
      initkx: function (t, a) {
        l(t)
        var n = a.split(',')
        t <= 3 && 1 == Math.round(n[1]) ? e("#kx_content input[name='dw5zi']").attr('checked', 'checked') : (e("#kx_content input[name='dw5zi']").attr('checked', !1), e("#kx_content input[name='dw5zi'][data-index='" + n[1] + "']").attr('checked', 'checked'))
        for (var i = 2; i < n.length; i++) {
          var r = n[i].split('|')
          if (1 == Math.round(r[0])) {
            1 == Math.round(r[1])
              ? (e("#kx_content tr.position-filter input[positiontype='0'][positionfilter='1']").attr('checked', 'checked'), e("#kx_content tr.position-filter input[positiontype='0'][positionfilter='0']").attr('checked', ''))
              : (e("#kx_content tr.position-filter input[positiontype='0'][positionfilter='0']").attr('checked', 'checked'), e("#kx_content tr.position-filter input[positiontype='0'][positionfilter='1']").attr('checked', ''))
            var o = r[2].split(':')
            ;(e("#kx_content tr.fixed-input input[name='wan']").val(o[0]),
              e("#kx_content tr.fixed-input input[name='qian']").val(o[1]),
              e("#kx_content tr.fixed-input input[name='bai']").val(o[2]),
              e("#kx_content tr.fixed-input input[name='shi']").val(o[3]),
              e("#kx_content tr.fixed-input input[name='ge']").val(o[4]),
              e('#kx_content tr.fixed-input').attr('style', ''),
              e('#kx_content tr.match-input').attr('style', 'display: none'),
              e("#kx_content tr.match-input input[type='text']").val(''))
          } else if (2 == Math.round(r[0])) {
            ;(e("#kx_content tr.position-filter input[positiontype='0']").attr('checked', !1),
              1 == Math.round(r[1])
                ? (e("#kx_content tr.position-filter input[positiontype='1'][positionfilter='1']").attr('checked', 'checked'), e("#kx_content tr.position-filter input[positiontype='1'][positionfilter='0']").attr('checked', !1))
                : (e("#kx_content tr.position-filter input[positiontype='1'][positionfilter='0']").attr('checked', 'checked'), e("#kx_content tr.position-filter input[positiontype='1'][positionfilter='1']").attr('checked', !1)))
            for (var s = r[2].split(':'), u = 1; u <= t; u++) e("#kx_content tr.match-input input[name='pei" + u + "']").val(s[u - 1])
            ;(e('#kx_content tr.fixed-input').attr('style', 'display: none'), e('#kx_content tr.match-input').attr('style', ''), e("#kx_content tr.fixed-input input[type='text']").val(''))
          } else if (3 == Math.round(r[0])) e("#kx_content input[name='quanzhuan']").val(r[1])
          else if (4 == Math.round(r[0])) e("#kx_content input[name='shangjiang']").val(r[1])
          else if (5 == Math.round(r[0])) (e("#kx_content td.zhi-filter-range input[name='zhifanwei1']").val(r[1].split('~')[0]), e("#kx_content td.zhi-filter-range input[name='zhifanwei2']").val(r[1].split('~')[1]))
          else if (6 == Math.round(r[0])) {
            1 == Math.round(r[1])
              ? (e("#kx_content tr.hefen-filter input[hefentype='1']").attr('checked', 'checked'), e("#kx_content tr.hefen-filter input[hefentype='0']").attr('checked', !1))
              : (e("#kx_content tr.hefen-filter input[hefentype='1']").attr('checked', !1), e("#kx_content tr.hefen-filter input[hefentype='0']").attr('checked', 'checked'))
            var p = r[2].split(';')
            u = 0
            e('#kx_content td.hefen-filter-item').each(function () {
              if (p[u]) {
                var t = p[u].split('-')[0].split(':')
                e(this).find("input[type='text']").val(p[u].split('-')[1])
                for (var a = 0; a < t.length; a++) e(this).find("input[type='checkbox']").eq(Math.round(t[a])).attr('checked', 'checked')
              }
              u++
            })
          } else if (7 == Math.round(r[0])) (e("#kx_content td.budinghe-filter input[budinghetype='" + r[1] + "']").attr('checked', 'checked'), e("#kx_content td.budinghe-filter input[type='text']").val(r[2]))
          else if (8 == Math.round(r[0])) e("#kx_content input[name='paichu']").val(r[1])
          else if (9 == Math.round(r[0])) {
            var d = r[1].split(':')
            for (u = 0; u < d.length; u++) e("#kx_content input.symbol-filter-item [name='" + d[u] + "']").attr('checked', 'checked')
          } else if (10 == Math.round(r[0])) (e("#kx_content td.contain-filter input[containfilter='" + r[1] + "']").attr('checked', 'checked'), e("#kx_content td.contain-filter input[name='han']").val(r[2]))
          else if (11 == Math.round(r[0])) (e("#kx_content td.contain-filter input[containfilter='" + r[1] + "']").attr('checked', 'checked'), e("#kx_content td.contain-filter input[name='fushi']").val(r[2]))
          else if (12 == Math.round(r[0])) {
            var c = ['two', 'three', 'four', 'double']
            for (u = 1; u < r.length; u++) e("#kx_content input[class='repeat-" + c[Math.round(r[u].split(':')[0])] + "-words-filter'][repeatwordsfilter='" + r[u].split(':')[1] + "']").attr('checked', 'checked')
          } else if (13 == Math.round(r[0])) {
            e("#kx_content input[class='logarithm-number-filter'][logarithmnumberfilter='" + r[1] + "']").attr('checked', 'checked')
            var f = r[2].split(':')
            for (u = 1; u <= f.length; u++) e("#kx_content input[name='duishu" + u + "'] ").val(f[u - 1])
          } else if (14 == Math.round(r[0])) {
            var h = ['two', 'three', 'four']
            for (u = 1; u < r.length; u++) e("#kx_content input[class='" + h[Math.round(r[u].split(':')[0])] + "-brother-filter'][brotherfilter='" + r[u].split(':')[1] + "']").attr('checked', 'checked')
          } else if (15 == Math.round(r[0])) {
            e("#kx_content input[class='odd-number-filter'][oddnumberfilter='" + r[1] + "']").attr('checked', 'checked')
            for (u = 2; u < r.length; u++) e('#kx_content').find("input[class='odd-number-item']").eq(Math.round(r[u])).attr('checked', 'checked')
          } else if (16 == Math.round(r[0])) {
            e("#kx_content input[class='even-number-filter'][evennumberfilter='" + r[1] + "']").attr('checked', 'checked')
            for (u = 2; u < r.length; u++) e('#kx_content').find("input[class='even-number-item']").eq(Math.round(r[u])).attr('checked', 'checked')
          }
        }
        e("#kx_content input[name='create-number']").click()
      },
      changeVal: function (t) {
        if ('four' == e('#type a.active').attr('data')) {
          for (var a = document.getElementsByName('dw5zi'), i = 0; i < a.length; i++) a[i].checked = !1
          ;(e(t).prop('checked', 'checked'), n.render('checkbox'))
        }
      },
      positionLog: function () {
        var t = e('#type a.active').attr('data'),
          a = 'one' == t ? 1 : 'two' == t ? 2 : 'three' == t ? 3 : 4,
          n = ''
        n = {
          1: '一字定',
          2: '二字定',
          3: '三字定',
          4: '四字定'
        }[a]
        var i = e('#kx_content tr.position-filter input:checked').attr('positiontype'),
          l = e('#kx_content tr.position-filter input:checked').attr('positionfilter')
        if (0 == i) {
          var r = e("#kx_content tr.fixed-input input[name='wan']").val(),
            o = e("#kx_content tr.fixed-input input[name='qian']").val(),
            s = e("#kx_content tr.fixed-input input[name='bai']").val()
          ;((n += 0 == l ? ',定位置取' : ',定位置除'), '' != r && (n += ',千位：' + r), '' != o && (n += ',百位：' + o), '' != s && (n += ',十位：' + s))
        } else {
          n += 0 == l ? ',配位置取' : ',配位置除'
          for (var u = {}, p = 1; p <= a; p++) {
            var d = e("#kx_content tr.match-input input[name='pei" + p + "']").val()
            u['pei' + p] = d
          }
          ;(u.pei1 && '' != u.pei1 && (n += ',千位：' + u.pei1), u.pei2 && '' != u.pei2 && (n += ',百位：' + u.pei2), u.pei3 && '' != u.pei3 && (n += ',十位：' + u.pei3))
        }
        e("#kx_content input[name='dw5zi']:checked").attr('data-index')
        var c = e('#kx_content tr.hefen-filter input:checked').attr('hefentype')
        '' != c && (n += 0 == c ? ',定位合分取' : ',定位合分除')
        var f = []
        ;(e('#kx_content td.hefen-filter-item').each(function () {
          var t = e(this).find("input[type='text']").val(),
            a = 0,
            n = []
          ;(e(this)
            .find("input[type='checkbox']")
            .each(function () {
              ;(e(this).prop('checked') && n.push(a), a++)
            }),
            f.push(n.join(',') + '-' + t))
        }),
          f[0] && '' != f[0].split('-')[0] && (n += ',千定位位置取：' + f[0].split('-')[0]),
          f[0] && '' != f[0].split('-')[1] && (n += ',千定位值取：' + f[0].split('-')[1]),
          f[1] && '' != f[1].split('-')[0] && (n += ',百定位位置取：' + f[1].split('-')[0]),
          f[1] && '' != f[1].split('-')[1] && (n += ',百定位值取：' + f[1].split('-')[1]),
          f[2] && '' != f[2].split('-')[0] && (n += ',十定位位置取：' + f[2].split('-')[0]),
          f[2] && '' != f[2].split('-')[1] && (n += ',十定位值取：' + f[2].split('-')[1]))
        var h = e('#kx_content td.budinghe-filter input[type=checkbox]:checked').attr('budinghetype'),
          m = e("#kx_content td.budinghe-filter input[type='text']").val()
        h && '' != h && (2 == h ? (n += ',两数和：' + m) : 3 == h && (n += ',三数和：' + m))
        var y = e("#kx_content td.zhi-filter-range input[name='zhifanwei1']").val(),
          g = e("#kx_content td.zhi-filter-range input[name='zhifanwei2']").val()
        ;(y && '' != y && (n += ',四字定范围最小值取：' + y), g && '' != g && (n += ',四字定范围最大值取：' + g))
        var b = e("#kx_content input[name='quanzhuan']").val()
        '' != b && (n += ',全转取值：' + b)
        var v = e("#kx_content input[name='shangjiang']").val()
        '' != v && (n += ',上奖取值：' + v)
        var O = e("#kx_content input[name='paichu']").val()
        '' != O && (n += ',排除取值：' + O)
        var X = []
        ;(e('#kx_content input.symbol-filter-item:checked').each(function () {
          X.push(e(this).attr('name'))
        }),
          X.length > 0 && '' != X && (n += ',乘号位置：' + X.join(',')))
        var x = e("#kx_content td.contain-filter input[type='checkbox']:checked").attr('containfilter'),
          k = e("#kx_content td.contain-filter input[name='han']").val(),
          w = e("#kx_content td.contain-filter input[name='fushi']").val()
        ;('' != x && (0 == x && '' != k ? (n += ',含取值：' + k) : 1 == x && '' != k && (n += ',含除值：' + k)), '' != x && (0 == x && '' != w && w ? (n += ',复式取值：' + w) : 1 == x && '' != w && w && (n += ',复式除值：' + w)))
        var M = e("#kx_content  input[class='repeat-two-words-filter']:checked").attr('repeatwordsfilter')
        M && '' != M && (n += 0 == M ? ',取双重' : ',除双重')
        var _ = e("#kx_content  input[class='repeat-three-words-filter']:checked").attr('repeatwordsfilter')
        _ && '' != _ && (n += 0 == _ ? ',取三重' : ',除三重')
        var j = e("#kx_content  input[class='two-brother-filter']:checked").attr('brotherfilter')
        j && '' != j && (n += 0 == j ? ',取两兄弟' : ',除两兄弟')
        var T = e("#kx_content  input[class='three-brother-filter']:checked").attr('brotherfilter')
        T && '' != T && (n += 0 == T ? ',取三兄弟' : ',除三兄弟')
        var N = e("#kx_content  input[class='logarithm-number-filter']:checked").attr('logarithmnumberfilter')
        N && '' != N && (n += 0 == N ? ',取对数' : ',除对数')
        var S = e("input[name='duishu1']").val()
        S && '' != S && (n += ',对数第一个输入框得值：' + S)
        var A = e("input[name='duishu2']").val()
        A && '' != A && (n += ',对数第二个输入框得值：' + A)
        var C = e("input[name='duishu3']").val()
        C && '' != C && (n += ',对数第三个输入框得值：' + A)
        var $ = e("#kx_content input[class='odd-number-filter']:checked").attr('oddnumberfilter'),
          K = e("#kx_content input[class='even-number-filter']:checked").attr('evennumberfilter'),
          L = [],
          D = [],
          F = 0
        return (
          e("#kx_content input[class='odd-number-item']").each(function () {
            ;(e(this).prop('checked') && L.push(F), F++)
          }),
          (F = 0),
          e("#kx_content input[class='even-number-item']").each(function () {
            ;(e(this).prop('checked') && D.push(F), F++)
          }),
          (0 != $ && 1 != $) || (n += 0 == $ ? ',单数取：' + L.join(',') : ',单数除：' + L.join(',')),
          (0 != K && 1 != K) || (n += 0 == K ? ',双数取：' + D.join(',') : ',双数除：' + D.join(',')),
          n
        )
      },
      getProLog: function () {
        return i
      },
      reset: function () {
        e("#kx_content input[name='reset-number']").click()
      }
    })
  }),
  layui.define([], function (exports) {
    var $ = layui.$
    Date.prototype.Format = function (t) {
      var e = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'H+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
      }
      for (var a in (/(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))), e)) new RegExp('(' + a + ')').test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[a] : ('00' + e[a]).substr(('' + e[a]).length)))
      return t
    }
    var S = {
        request: null,
        intervalTime: null,
        intervalOpenTime: null,
        initialization: null,
        scrollinterval: null,
        stop: !0,
        lineStop: !0,
        loadingWrap: !0,
        backList: [],
        action: '/totaldata/action.ashx',
        loginDefautl: '/login/?e=' + +new Date()
      },
      _INI_ = {
        alertHtm:
          "<div id='myWarpr'><table class='myLayer' cellspacing='0' cellpadding='0' border='0'><tbody><tr><td><div class='myLayerOn'></div><div class='myLayerTitle'><h3></h3><a href='javascript:;' class='myLayerClose' title='關閉'></a></div><div class='myLayerContent' style='width:auto;height:auto;'></div><div class='myLayerFooter'><a href='javascript:;' class='btn grayBtn myLayerCancel' title='取消'>取消</a><a href='javascript:;' class='btn hotBtn myLayerOk' title='确认'>确认</a></div><div class='myLayerLoading'></div></td></tr></tbody></table></div>"
      },
      G = {
        alert: function (t) {
          ;($('#myWarpr').remove(), $('body').append(_INI_.alertHtm))
          var e,
            a,
            n = $('#myWarpr'),
            i = t.title || '提示',
            l = t.content || '',
            r = t.width || 'auto',
            o = t.height || 'auto',
            s = t.initialize || !1,
            u = t.cancel || !1,
            p = t.ok || !1,
            d = t.close || !1,
            c = t.okVal || '确认',
            f = t.cancelVal || '取消'
          if (
            (n.find('.myLayerTitle h3').html(i),
            n.find('.myLayerContent').html(l),
            n.find('.myLayerFooter').hide(),
            n.find('.myLayerFooter a.myLayerCancel').html(f).attr('title', f).hide(),
            n.find('.myLayerFooter a.myLayerOk').html(c).attr('title', c).hide(),
            $('#mymask').remove(),
            $('body').append("<div class='myLayerLoading' id='mymask'></div>"),
            $('#mymask').show(),
            t.obj)
          ) {
            var h = t.obj,
              m = h.offset()
            ;((e = m.top + h.height() + 10), (a = m.left + 10))
          } else {
            ;(n.find('.myLayerOn').hide(),
              n.find('.myLayerContent').css({
                width: r,
                height: o,
                'overflow-y': 'auto'
              }))
            var y = n.find('.myLayerContent').width(),
              g = n.find('.myLayerContent').height()
            ;((e = ($(window).height() - g) / 2.8),
              (a = ($(window).width() - y) / 2),
              $(window).resize(function () {
                ;(n.find('.myLayer').css({
                  left: ($(window).width() - y) / 2,
                  top: ($(window).height() - g) / 2.8
                }),
                  $('#mymask').css('height', $(window).height()))
              }))
          }
          ;(n.find('.myLayer').css({
            top: e,
            left: a
          }),
            window.scrollTo(0, 0),
            p && (n.find('.myLayerFooter').show(), n.find('.myLayerFooter a.myLayerOk').show().focus()),
            u && (n.find('.myLayerFooter').show(), n.find('.myLayerFooter a.myLayerCancel').show()),
            s && s(n),
            n
              .find('.myLayerClose')
              .unbind('click')
              .click(function () {
                ;(d && d(), G.alertClose())
              }),
            n
              .find('.myLayerCancel')
              .unbind('click')
              .click(function () {
                ;(d && d(), u() || G.alertClose())
              }),
            n
              .find('.myLayerOk')
              .unbind('click')
              .click(function () {
                ;(p() && G.alertClose(), d && d())
              }))
        },
        alertClose: function () {
          ;($('#myWarpr').remove(), $('#mymask').remove())
        },
        mask: function () {
          ;($('#mask-eah').remove(), $('#myLayerImg').remove(), $('body').append("<div class='myLayerLoading' id='mask-eah'></div>"), $('body').append("<div class='myLayerImg' id='myLayerImg'></div>"), $('#mask-eah').show())
        },
        maskClose: function () {
          ;($('#mask-eah').remove(), $('#myLayerImg').remove())
        },
        myLayerImg: function () {
          ;($('#myLayerImg').remove(), $('body').append("<div class='myLayerImg' id='myLayerImg'></div>"))
        },
        myLayerImgClose: function () {
          $('#myLayerImg').remove()
        },
        isAction: function (t) {
          for (var e = 0; e < t.ary.length; e++) if (t.key === t.ary[e]) return !0
        },
        strToObj: function strToObj(str) {
          for (var mystr = str.split('&'), s, data = ['"__":"' + mystr[0] + '"'], i = 1; i < mystr.length; i++) mystr[i] && ((s = mystr[i].split('=')), data.push('"' + s[0] + '":"' + s[1] + '"'))
          return eval('({' + data.join(',') + '})')
        },
        myTips: function (t) {
          var e = t.content,
            a = t.obj.offset(),
            n = t.top || 3,
            i = t.left || 10,
            l = t.top || a.top - n,
            r = "<div id='myxTips' style='left:" + (t.left || a.left + t.obj.width() + i) + 'px; top:' + l + "px;'><div id='myxTipsLeft'></div><div id='myxTipsContent'>" + e + '</div></div>'
          if (($('#myxTips').remove(), $('body').append(r), t.myclick)) {
            var o = 0
            $('body')
              .unbind('click')
              .click(function () {
                ++o > 1 && ($('#myxTips').remove(), $('body').unbind('click'))
              })
          } else setTimeout('G.removeTips()', 2e3)
        },
        removeTips: function () {
          $('#myxTips').remove()
        },
        ajax: function (t, e, a) {
          return $.ajax({
            type: 'post',
            url: t.split('&')[0],
            cache: !1,
            timeout: 3e4,
            dataType: 'json',
            data: G.strToObj(t + '&t=' + __sysinfo.autoTid),
            success: function (t) {
              try {
                t.error
                  ? 'SystemMaintenance' == t.error
                    ? (location.href = S.loginDefautl)
                    : (a && a(),
                      G.alert({
                        content: t.error,
                        ok: function () {
                          return !0
                        }
                      }))
                  : e && e(t)
              } catch (t) {
                a && a()
              }
            },
            error: function () {
              a && a()
            }
          })
        },
        mouseover: function (t, e) {
          var a = $(t)
          $(a).mouseover(function () {
            var t = e || 'myqhs'
            $(this)
              .addClass(t)
              .mouseout(function () {
                $(this).removeClass(t)
              })
          })
        },
        urlReplace: function (t) {
          var e = t.url || '',
            a = t.paramName || 'page',
            n = t.val || '',
            i = t.pad,
            l = new RegExp('(/?|&)' + a + '=([^&]+$)|' + a + '=[^&]+&', 'i'),
            r = e.replace(l, '')
          if (1 == i) {
            var o = -1 === r.indexOf('?') ? '?' : '&'
            return r + o + a + '=' + n
          }
          return r
        },
        query: function (t, e) {
          var a = new RegExp('(^|&)' + t + '=([^&]*)(&|$)', 'i'),
            n = e || location.href,
            i = decodeURI(n).split('?')[1].match(a)
          return null != i ? unescape(i[2]) : null
        },
        forDight: function (t, e) {
          return ((t = Math.round(t * Math.pow(10, e)) / Math.pow(10, e)), parseFloat(t))
        },
        toDecimal: function (t, e) {
          if (isNaN(parseFloat(t))) return !1
          var a = (Math.round(100 * t) / 100).toString(),
            n = a.indexOf('.')
          for (n < 0 && ((n = a.length), (a += '.')); a.length <= n + e; ) a += '0'
          return a
        },
        setCookie: function (t, e) {
          var a = new Date()
          ;(a.setTime(a.getTime() + 864e6), (document.cookie = t + '=' + escape(e) + ';expires=' + a.toGMTString()))
        },
        getCookie: function (t) {
          var e,
            a = new RegExp('(^| )' + t + '=([^;]*)(;|$)')
          return (e = document.cookie.match(a)) ? unescape(e[2]) : null
        },
        delCookie: function (t) {
          var e = new Date()
          e.setTime(e.getTime() - 1)
          var a = comm.getCookie(t)
          null != a && (document.cookie = t + '=' + a + ';expires=' + e.toGMTString())
        },
        DecimalSign: function (t) {
          return /^[0-9]+(\.[0-9]+)?$/.test(t)
        },
        NumberSign: function (t) {
          return /^[0-9]+$/.test(t)
        },
        clearNoNum: function (t) {
          ;(t.val(t.val().replace(/[^\d.]/g, '')), t.val(t.val().replace(/^\./g, '')), t.val(t.val().replace(/\.{2,}/g, '.')), t.val(t.val().replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3')), t.val(t.val().replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')))
        },
        NumberSignt: function (t) {
          return /^[+-]?[0-9]+$/.test(t)
        },
        ChznSign: function (t) {
          return /^[a-zA-Z0-9-\u4e00-\u9fa5]+$/.test(t)
        },
        StringSign: function (t) {
          return /^[a-z0-9A-Z][a-z0-9A-Z_]{0,50}$/.test(t)
        },
        AryMethod: function (t) {
          for (var e = {}, a = [], n = 0; n < t.length; n++) e[t[n]] || ((e[t[n]] = !0), a.push(t[n]))
          return a
        },
        overflowDiv: function (t) {
          return "<div id='" + (t.id || +new Date()) + "' style='max-height:" + (t.height || 280) + "px; overflow-y:auto;'>" + (t.content || '加载中...') + '</div>'
        },
        searchPage: function (t, e, a) {
          var n = !1,
            i = t.attr('id'),
            l = e || parseInt($('#shell_pageControl .pager #currentPage').html()),
            r = a || parseInt($('#shell_pageControl .pager #totalPage').html())
          return ('first' == i && l > 1 ? (n = 1) : 'previous' == i && l > 1 ? (n = l - 1) : 'next' == i && r > l ? (n = l + 1) : 'last' == i && r > l && (n = r), n)
        },
        settimes: function (t) {
          if (t > 0 && G.NumberSign(t)) {
            t = parseInt(t)
            var e = Math.floor(t / 60),
              a = Math.floor(t - 60 * e)
            return (e.toString().length <= 1 ? '0' + e : e) + ':' + (a.toString().length <= 1 ? '0' + a : a)
          }
          return '00:00'
        },
        settimer: function (t) {
          if (t > 0 && G.NumberSign(t)) {
            var e = Math.floor(t / 1440 / 60),
              a = Math.floor((t - 1440 * e * 60) / 3600),
              n = Math.floor((t - 1440 * e * 60 - 3600 * a) / 60),
              i = t - 1440 * e * 60 - 3600 * a - 60 * n
            return (a = 1 == a.toString().length ? '0' + a : a) + ':' + (n = 1 == n.toString().length ? '0' + n : n) + ':' + (i = 1 == i.toString().length ? '0' + i : i)
          }
          return '00:00:00'
        },
        scrollLoad: function (t) {
          var e,
            a = {
              top: t.top || '98px',
              left: t.left || '0',
              backColor: t.backColor || 'blue',
              width: t.width || '0px',
              height: t.height || '5px',
              display: t.display || 'block',
              scrollStart: t.scrollStart || 0,
              scrollLneght: t.scrollLneght || $(window).width() - 10,
              second: t.second || 1,
              increase: t.increase || 0.7,
              addDiv: t.addDiv || 'Yes'
            }
          'Yes' == a.addDiv &&
            ((e = "<div class='loadScroll' id='LoadScroll'"),
            (e += "style='"),
            (e += 'position:absolute;'),
            (e += 'top:' + a.top + ';'),
            (e += 'left:' + a.left + ';'),
            (e += 'width:' + a.width + ';'),
            (e += 'max-width:' + (a.scrollLneght - 20) + 'px;'),
            (e += 'height:' + a.height + ';'),
            (e += "'></div>"),
            $('body').append(e))
          var n = a.scrollStart,
            i = a.scrollLneght
          ;(clearInterval(S.scrollinterval),
            (S.scrollinterval = setInterval(function () {
              ;((n += a.increase),
                (i -= a.increase),
                t.back ? $('#LoadScroll').css('width', i + 'px') : $('#LoadScroll').css('width', n + 'px'),
                ((!t.back && n > a.scrollLneght) || (t.back && i < 0)) &&
                  (clearInterval(S.scrollinterval),
                  t.remove &&
                    setTimeout(function () {
                      $('#LoadScroll').remove()
                    }, 300)))
            }, a.second)))
        },
        rollBack: function () {
          var t = $('#LoadScroll').width()
          setTimeout(function () {
            G.scrollLoad({
              scrollLneght: t,
              increase: 50,
              second: 10,
              addDiv: 'No',
              back: !0,
              remove: !0
            })
          }, 500)
        },
        loadEnd: function () {
          var t = $('#LoadScroll').width()
          G.scrollLoad({
            scrollStart: t,
            increase: 90,
            addDiv: 'No',
            remove: !0
          })
        },
        safety: function (t) {
          var e = !0,
            a = t.toLowerCase(),
            n = /^[0-9]+$/g
          return (n.test(a) && (e = !1), (n = /^[a-z]+$/g).test(a) && (e = !1), e)
        },
        toRmb: function (t) {
          var e,
            a = t || $('#Credits').val()
          if (/^[0-9]*[1-9][0-9]+$/.test(a) || '' == a) {
            ;-1 == a.indexOf('.') ? ((e = a), '') : ((e = a.substr(0, a.indexOf('.'))), a.substr(a.indexOf('.') + 1, a.length))
            var n = 1,
              i = e.length,
              l = ['', '萬', '億'],
              r = ['十', '百', '千'],
              o = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
              s = (k2 = 0),
              u = ''
            for (n = 1; n <= i; n++) {
              var p = e.charAt(i - n)
              if (('0' == p && 0 != s && (u = u.substr(1, u.length - 1)), (u = o[Number(p)].concat(u)), i - n - 1 >= 0))
                if (3 != s) ((u = r[s].concat(u)), s++)
                else {
                  s = 0
                  var d = u.charAt(0)
                  ;(('萬' != d && '億' != d) || (u = u.substr(1, u.length - 1)), (u = l[k2].concat(u)))
                }
              3 == s && k2++
            }
            return (u.length >= 2 && '一十' == u.substr(0, 2) && (u = u.substr(1, u.length - 1)), u)
          }
        },
        contains: function (t) {
          for (var e = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46], a = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48], n = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49], i = 0; i < e.length; i++) if (e[i] == t) return 'red'
          for (i = 0; i < a.length; i++) if (a[i] == t) return 'bluer'
          for (i = 0; i < n.length; i++) if (n[i] == t) return 'green'
        },
        contains_gx: function (t) {
          for (var e = [1, 4, 7, 10, 13, 16, 19], a = [2, 5, 8, 11, 14, 17, 20], n = [3, 6, 9, 12, 15, 18, 21], i = 0; i < e.length; i++) if (e[i] == t) return 'red'
          for (i = 0; i < a.length; i++) if (a[i] == t) return 'bluer'
          for (i = 0; i < n.length; i++) if (n[i] == t) return 'green'
        },
        DuplexSum: function (t, e) {
          for (var a = [], n = e.length, i = 0, l = 0; l < n; l++)
            for (var r = l + 1; r < n; r++)
              if (2 != t)
                for (var o = r + 1; o < n; o++)
                  if (3 != t)
                    for (var s = o + 1; s < n; s++)
                      if (4 != t)
                        for (var u = s + 1; u < n; u++)
                          if (5 != t)
                            for (var p = u + 1; p < n; p++)
                              if (6 != t)
                                for (var d = p + 1; d < n; d++)
                                  if (7 != t)
                                    for (var c = d + 1; c < n; c++)
                                      if (8 != t)
                                        for (var f = c + 1; f < n; f++)
                                          if (9 != t) for (var h = f + 1; h < n; h++) 10 != t || (i++, a.push(e[l] + ',' + e[r] + ',' + e[o] + ',' + e[s] + ',' + e[u] + ',' + e[p] + ',' + e[d] + ',' + e[c] + ',' + e[f] + ',' + e[h]))
                                          else (i++, a.push(e[l] + ',' + e[r] + ',' + e[o] + ',' + e[s] + ',' + e[u] + ',' + e[p] + ',' + e[d] + ',' + e[c] + ',' + e[f]))
                                      else (i++, a.push(e[l] + ',' + e[r] + ',' + e[o] + ',' + e[s] + ',' + e[u] + ',' + e[p] + ',' + e[d] + ',' + e[c]))
                                  else (i++, a.push(e[l] + ',' + e[r] + ',' + e[o] + ',' + e[s] + ',' + e[u] + ',' + e[p] + ',' + e[d]))
                              else (i++, a.push(e[l] + ',' + e[r] + ',' + e[o] + ',' + e[s] + ',' + e[u] + ',' + e[p]))
                          else (i++, a.push(e[l] + ',' + e[r] + ',' + e[o] + ',' + e[s] + ',' + e[u]))
                      else (i++, a.push(e[l] + ',' + e[r] + ',' + e[o] + ',' + e[s]))
                  else (i++, a.push(e[l] + ',' + e[r] + ',' + e[o]))
              else (i++, a.push(e[l] + ',' + e[r]))
          return {
            list: a,
            count: i
          }
        }
      }
    function forceMiddle(t) {
      var e = t.id || +new Date(),
        a = t.title || '',
        n = t.titleNav || '',
        i = t.thead || [],
        l = t.tbody || []
      ;(a && $('#shell_title').html(a), n && '' != n && $('#shell_top').append("<div id='title-nav'>" + n + '</div>'))
      for (var r = ['<tr>'], o = 0; o < i.length; o++) r.push('<th>' + i[o] + '</th>')
      ;(r.push('</tr>'), t.eachThead && (r = [t.eachThead]))
      var s = ''
      return (
        t.fonDiv && (s = "<div id='fondiv' style='text-align:center;padding:5px 0;margin-top:2px;' class='bc'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無數據加載！</span></div>"),
        "<div id='" + e + "'><table class='middle-table'><thead>" + r.join('') + '</thead><tbody>' + l.join('') + '</tbody></table>' + s + '</div>'
      )
    }
    function pageMiddle(t, e) {
      var a =
        "<div id='shell_pageControl'><div class='pager' id='data-page'><span class='first cursor' id='first'>首页</span><span class='previous cursor' id='previous'>上一页</span><span class='current_page'>第<b id='currentPage'>" +
        (t.currentPage || 0) +
        "</b>页</span><span class='total_page'>共<b class='total' id='totalPage'>" +
        (t.totalPage || 0) +
        "</b>页</span><span class='next cursor' id='next'>下一页</span><span class='last cursor' id='last'>尾页</span></div></div>"
      t.obj &&
        (0 == $('#data-page').length && t.obj.html(a),
        t.obj.html(a),
        $('#data-page span.cursor')
          .unbind('click')
          .click(function () {
            var a = G.searchPage($(this))
            a &&
              e &&
              e &&
              e(
                G.urlReplace({
                  url: '?' + t.referrer,
                  paramName: 'page',
                  val: a,
                  pad: !0
                }).replace('?', '')
              )
          }))
    }
    function SelectBoxSet(t) {
      for (var e = __sysinfo.ipJoin || __sysinfo.data.ipJson, a = 0; a < e.length; a++)
        ping({
          url: e[a],
          beforePing: function (t) {
            $("#lineching input[type='text']").eq(t).val('测速中')
          },
          afterPing: function (t, e) {
            var a = ''
            ;((a = e < 200 ? '超好' : e < 500 ? '较好' : e >= 2e3 ? '超时' : e + '毫秒'), $("#lineching input[type='text']").eq(t).val(a))
          },
          interval: 1,
          idx: a
        })
    }
    function ping(t) {
      var e, a, n, i
      $.ajax({
        url: ((i = t.url), (new RegExp('^((https|http)?://){1}').test(i) ? i : 'http://' + i) + '/netTest/?date=' + new Date().getTime()),
        type: 'GET',
        dataType: 'json',
        timeout: 3e3,
        beforeSend: function () {
          ;(t.beforePing && t.beforePing(t.idx), (a = new Date().getTime()))
        },
        complete: function (i) {
          ;((n = new Date().getTime()), (e = Math.abs(a - n)), t.afterPing && t.afterPing(t.idx, e))
        }
      })
    }
    function floatAdd(t, e) {
      var a, n, i
      try {
        a = t.toString().split('.')[1].length
      } catch (t) {
        a = 0
      }
      try {
        n = e.toString().split('.')[1].length
      } catch (t) {
        n = 0
      }
      return ((i = Math.pow(10, Math.max(a, n))), parseFloat(((t * i + e * i) / i).toFixed(5)))
    }
    function floatSubtr(t, e) {
      return floatAdd(t, -e)
    }
    function peishuquanzhuan(t, e, a, n) {
      var i = []
      if (1 == t)
        for (var l = 0; l < e[0].length; l++)
          for (var r = 0; r < 3; r++) {
            ;(((h = ['X', 'X', 'X'])[r] = e[0][l]), -1 == i.indexOf(h.join('')) && i.push(h.join('')))
          }
      else if (2 == t) {
        for (l = 0; l < e[0].length; l++)
          for (r = 0; r < e[1].length; r++)
            if (!n || l != r)
              for (var o = 0; o < 2 + a; o++)
                for (var s = o + 1; s < 3 + a; s++)
                  for (
                    var u = [
                        [0, 1],
                        [1, 0]
                      ],
                      p = [e[0][l], e[1][r]],
                      d = 0;
                    d < u.length;
                    d++
                  ) {
                    ;(((h = ['X', 'X', 'X'])[o] = p[u[d][0]]), (h[s] = p[u[d][1]]), -1 == i.indexOf(h.join('')) && i.push(h.join('')))
                  }
      } else if (3 == t)
        for (l = 0; l < e[0].length; l++)
          for (r = 0; r < e[1].length; r++)
            if (!n || l != r)
              for (var c = 0; c < e[2].length; c++)
                if (!n || (c != r && c != l))
                  for (o = 0; o < 1; o++)
                    for (s = o + 1; s < 2; s++)
                      for (var f = s + 1; f < 3; f++)
                        for (
                          u = [
                            [0, 1, 2],
                            [0, 2, 1],
                            [1, 0, 2],
                            [1, 2, 0],
                            [2, 0, 1],
                            [2, 1, 0]
                          ],
                            p = [e[0][l], e[1][r], e[2][c]],
                            d = 0;
                          d < u.length;
                          d++
                        ) {
                          var h
                          ;(((h = ['X', 'X', 'X'])[o + a] = p[u[d][0]]), (h[s + a] = p[u[d][1]]), (h[f + a] = p[u[d][2]]), -1 == i.indexOf(h.join('')) && i.push(h.join('')))
                        }
      return i
    }
    function dwcreatenumber(t, e, a) {
      var n = []
      if (1 == t)
        for (var i = 0; i < a.length; i++) {
          var l = ['X', 'X', 'X']
          if (e[a[i]]) for (var r = 0; r < e[a[i]].length; r++) ((l[a[i]] = e[a[i]][r]), -1 == n.indexOf(l.join('')) && n.push(l.join('')))
          else for (r = 0; r < e[0].length; r++) ((l[a[i]] = e[0][r]), -1 == n.indexOf(l.join('')) && n.push(l.join('')))
        }
      else if (2 == t)
        for (r = 0; r < e[a[0]].length; r++)
          for (var o = 0; o < e[a[1]].length; o++) {
            ;(((l = ['X', 'X', 'X'])[a[0]] = e[a[0]][r]), (l[a[1]] = e[a[1]][o]), -1 == n.indexOf(l.join('')) && n.push(l.join('')))
          }
      else if (3 == t)
        for (r = 0; r < e[a[0]].length; r++)
          for (o = 0; o < e[a[1]].length; o++)
            for (var s = 0; s < e[a[2]].length; s++) {
              ;(((l = ['X', 'X', 'X'])[a[0]] = e[a[0]][r]), (l[a[1]] = e[a[1]][o]), (l[a[2]] = e[a[2]][s]), -1 == n.indexOf(l.join('')) && n.push(l.join('')))
            }
      return n
    }
    function brother(t) {
      for (var e = [], a = 0; a < t.length; a++) 'X' != t[a] && e.push(t[a])
      e = e.sort()
      for (var n = [], i = 0; i < e.length; i++) -1 == n.indexOf(e[i]) && n.push(e[i])
      e = n
      var l = 0
      for (a = 1; a < e.length; a++)
        if (e[a] - e[a - 1] == 1) l++
        else if (l > 0) break
      return ((2 != e.length && 3 != e.length) || e[e.length - 1] - e[0] != 9 ? 4 == e.length && ('0189' == e.join('') ? (l = 3) : 0 == l && e[e.length - 1] - e[0] == 9 ? (l = 1) : e[e.length - 1] - e[0] != 9 || (e[1] - e[0] != 1 && e[3] - e[2] != 1) || l++) : l++, l + 1)
    }
    function chong(t) {
      t = t.replace(/X/g, '')
      for (var e = {}, a = 0; a < t.length; a++) e[t[a]] ? e[t[a]]++ : (e[t[a]] = 1)
      var n = 0,
        i = 0
      for (var l in e) (e[l] > n && (n = e[l]), 2 == e[l] && i++)
      return 2 == i ? 5 : n
    }
    function getNumbersByCategory(t, e) {
      var a
      1 == t
        ? (a = [0, 1, 2])
        : 2 == t
          ? (a =
              0 == e
                ? [
                    [0, 1],
                    [0, 2],
                    [1, 2]
                  ]
                : [
                    [0, 4],
                    [1, 4],
                    [2, 4],
                    [3, 4]
                  ])
          : 3 == t &&
            (a =
              0 == e
                ? [[0, 1, 2]]
                : [
                    [0, 1, 4],
                    [0, 2, 4],
                    [0, 3, 4],
                    [1, 2, 4],
                    [1, 3, 4],
                    [2, 3, 4]
                  ])
      var n = []
      if (1 == t) {
        var i = a
        ;(((r = [])[0] = '0123456789'), (n = n.concat(dwcreatenumber(t, r, i))))
      } else
        for (var l = 0; l < a.length; l++) {
          for (var r = [], o = ((i = a[l]), 0); o < i.length; o++) r[i[o]] = '0123456789'
          n = n.concat(dwcreatenumber(t, r, i))
        }
      return n
    }
    ;((Array.prototype.uniquelize = function () {
      for (var t = {}, e = [], a = 0, n = this.length; a < n; a++) t[this[a]] || ((t[this[a]] = 1), e.push(this[a]))
      return e
    }),
      (Array.intersect = function () {
        for (var t = [], e = {}, a = 0; a < arguments.length; a++)
          for (var n = 0; n < arguments[a].length; n++) {
            var i = arguments[a][n]
            e[i] ? (e[i]++, e[i] == arguments.length && t.push(i)) : (e[i] = 1)
          }
        return t
      }),
      (Array.prototype.minus = function (t) {
        for (var e = [], a = {}, n = 0; n < t.length; n++) a[t[n]] = 1
        for (var i = 0; i < this.length; i++) a[this[i]] || ((a[this[i]] = 1), e.push(this[i]))
        return e
      }),
      (Array.union = function () {
        for (var t = [], e = {}, a = 0; a < arguments.length; a++)
          for (var n = 0; n < arguments[a].length; n++) {
            var i = arguments[a][n]
            e[i] || ((e[i] = 1), t.push(i))
          }
        return t
      }),
      exports('globals', {
        forceMiddle: forceMiddle,
        getNumbersByCategory: getNumbersByCategory,
        chong: chong,
        brother: brother,
        dwcreatenumber: dwcreatenumber,
        peishuquanzhuan: peishuquanzhuan,
        floatSubtr: floatSubtr,
        SelectBoxSet: SelectBoxSet,
        G: G
      }))
  }),
  layui.define(function (t) {
    var e,
      a,
      n,
      l = layui.jquery,
      r = layui.laytpl,
      o = (layui.utils, layui.form),
      s =
        '<div style="text-align:center;margin:10px;"><button type="button" name="" lay-submit="" lay-filter="" class="pd5 mgr10" onclick="layui.quickTranslate.sureLot(this)">立即下注</button><button type="button" name="" lay-filter="" class="pd5 mgr10 " onclick="layui.quickTranslate.clear()">清空</button>&nbsp;&nbsp;总注数：<strong>{{d.count}}</strong>&nbsp;&nbsp;总金额：<strong>{{layui.utils.numFormat(d.sum*10000,2)}}</strong>&nbsp;&nbsp;</div><table class="table table-bd mg0"><thead class="bgcolor-gray"><tr><th>号码</th><th>金额</th><th>号码</th><th>金额</th><th>号码</th><th>金额</th><th>号码</th><th>金额</th><th>号码</th><th>金额</th><th>号码</th><th>金额</th></tr></thead><tbody id="showData">{{# if(d.list.length>0){}}{{# layui.each(d.list,function(i,t){ }}<tr>{{# layui.each(t.rows,function(idx,item){ }}<td>{{item.num}}</td><td>{{item.my}}</td>{{# }); }}</tr>{{# }); }}{{# }else{ }}<tr><td colspan="12">规则不正确</td></tr>{{# } }}</tbody></table>',
      u =
        '<div style="text-align:center;margin:10px;"><input type="text" name="lotMy" id="lotMy" lay-verify="required" value="" class="layui-input layui-input-ws set-w120"><button type="button" name="" lay-submit="" lay-filter="" class="pd5 mgr10" name="sure" onclick="layui.quickTranslate.sureLot(this)">立即下注</button>&nbsp;&nbsp;<button type="button" name="" lay-filter="" class="pd5 mgr10" onclick="layui.quickTranslate.clear()">清空</button>&nbsp;&nbsp;总注数：<strong>{{d.count}}</strong>&nbsp;&nbsp;总金额：<strong id="sumMy">0</strong>&nbsp;&nbsp;</div><table class="table table-bd mg0"><thead class="bgcolor-gray"><tr><th>号码</th><th>号码</th><th>号码</th><th>号码</th><th>号码</th><th>号码</th><th>号码</th><th>号码</th><th>号码</th><th>号码</th><th>号码</th><th>号码</th></tr></thead><tbody id="showData">{{# if(d.list.length>0){}}{{# layui.each(d.list,function(ib,t){ }}<tr>{{# layui.each(t.rows,function(idx,item){ }}<td>{{item.num}}</td>{{# }); }}</tr>{{# }); }}{{# }else{ }}<tr><td colspan="12">规则不正确</td></tr>{{# } }}</tbody></table>'
    function p(t) {
      var a,
        i = [],
        r = {},
        o = l(layui.main.container.lttnum).filter(':first').text()
      if ('table' == e)
        (l.each(n, function (t, e) {
          l.each(e.rows, function (t, e) {
            var a = {}
            ;(e.num.toString().length < 4 ? (a.bn = 'A' + e.num.toString()) : 4 == e.num.toString().length && e.num.toString().indexOf('A') < 0 ? (a.bn = e.num.toString() + 'X') : (a.bn = e.num.toString()), (a.am = e.my), i.push(a))
          })
        }),
          (r.betNoList = i),
          (r.orderWays = 5),
          (r.stageNo = o))
      else {
        var s = l('#lotMy').val()
        if (isNaN(s)) return (layui.utils.msg('请输入正确的金额'), !1)
        ;(l.each(n, function (t, e) {
          l.each(e.rows, function (t, e) {
            var a = {}
            ;(e.num.toString().length < 4 ? (a.bn = 'A' + e.num.toString()) : 4 == e.num.toString().length && e.num.toString().indexOf('A') < 0 ? (a.bn = e.num.toString() + 'X') : (a.bn = e.num.toString()), (a.am = s), i.push(a))
          })
        }),
          (r.betNoList = i),
          (r.orderWays = 5),
          (r.stageNo = o))
      }
      if (i.length < 1) return !1
      var u = !0
      return (
        l.each(i, function (t, e) {
          var n = ''
          n = e.bn.indexOf('A') >= 0 ? e.bn.replace(/[0-9]/gi, 'A') : e.bn.replace(/[0-9]/gi, '口')
          var i = !1
          if (
            (l.each(undefined, function (t, l) {
              if (l.BLCODE == n) {
                a = layui.utils.numFormat(l.BASE, 2)
                var o = 0
                return ((1e4 * (o = null != r.am ? r.am : e.am)) / a > Math.floor((1e4 * o) / a) && ((u = !1), (i = !0)), !1)
              }
            }),
            i)
          )
            return !1
        }),
        u
          ? l(t).attr('autoTask')
            ? (l.each(i, function (t, e) {
                e.am = 1e4 * s
              }),
              layui.chaseNumber.addChaseNumber(i),
              !1)
            : ((r.ock = layui.utils.guid().replace(/-/g, 'f')),
              void layui.utils.post({
                url: 'member/bet/doOrder',
                data: r,
                type: 'POST',
                isSystemHandle: !1,
                dataType: 'JSON',
                success: function (t) {
                  if (t.successCode > 0) {
                    ;(layui.main.showUnprint(), layui.main.initUserInfo())
                    var e = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                    ;(l('#childMenu').find('li:eq(2)').find('a').click(), layui.main.palyAudio('success'))
                  } else {
                    e = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                    ;(layui.utils.msg(e), layui.main.palyAudio('fail'), t.msg && layui.utils.msg(t.msg + '<br>' + e))
                  }
                },
                error: function () {
                  layui.utils.msg('系统繁忙，请稍后再试!')
                }
              }))
          : (layui.utils.msg('递增基数为' + a), !1)
      )
    }
    ;((Array.prototype.intersect = function (t) {
      var e = [],
        a = '',
        n = t.join('')
      for (i = 0; i < this.length; i++) n.indexOf(this[i]) >= 0 && (a += '##' + this[i])
      return ('' != a && '##' != a && (e = a.replace('##', '').split('##')), e)
    }),
      t('quickTranslate', {
        render: function () {
          var t = {}
          'open' === layui.main.container.status
            ? r(
                '<div class="panel panel-success mgb10"><div class="panel-heading"><div class="panel-title">快译</div></div><div class="panel-body pd0"><table class="table table-bd mg0"><tbody><tr><td width="60%" class="pd5"><textarea style="width:96%; height: 220px;resize: none;padding: 8px 2%;" id="tarea"></textarea></td><td width="40%" class="pd5 text-left"><h4><strong>重要提示：</strong></h4><ol class="ol-list"><li>本公司推出“快译”是为了方便客户分析下注，为了避免给自己带来没有必要的损失，敬请各位客户务必检查确认后再下注！由于精度没有做到百分百（我们一直在努力！）。<span class="text-red">公司一切以下注明细为准</span>，如有不便，希望各位会员谅解！</li><li><a href="rule.html" target="_blank" data="rule.html" class="text-red text-hyperlink">快译规则说明</a></li><li>每条规则中会去掉重复的号码</li><li><strong>五星</strong>（前二、后二、首尾）<br>请在输入的每行内容前面添加字母“<span class="text-red">w</span>”</li></ol></td></tr></tbody></table></div></div><div class="panel panel-success" id="lotNumShow" style="display:none;"><div class="panel-heading"><div class="panel-title">生成号码明细</div></div><div class="panel-body pd0" id="showTable"></div></div>'
              ).render(t, function (t) {
                ;(layui.main.container.content.html(t),
                  o.render(),
                  (a = ''),
                  l('#tarea').bind('input propertychange', function () {
                    var t = l(this).val()
                    if (t === a) return !1
                    ;((a = t), (t = t.replace(/\n/g, ';').replace(/\r\n/g, ';').replace(/\s/g, '#')))
                    var i = layui.translateRule.proTrateNum(t),
                      o = []
                    ;(null == i.msg &&
                      layui.$.each(i, function (t, e) {
                        layui.$.each(e, function (t, e) {
                          var a = {}
                          ;((a.list = e.list), (a.money = e.money), o.push(a))
                        })
                      }),
                      (function (t) {
                        var a = []
                        if (t.length > 0 && t[0].money && '' != t[0].money) {
                          e = 'table'
                          var i = [],
                            o = 0,
                            d = 0
                          if (
                            (layui.$.each(t, function (t, e) {
                              layui.$.each(e.list, function (t, n) {
                                if (o % 6 == 0) {
                                  if (i.length > 0) {
                                    var l = {}
                                    ;((l.rows = i), a.push(l))
                                  }
                                  ;((i = []), ((r = {}).num = n), (r.my = e.money), (d = 1 * d + 1 * e.money), i.push(r), o++)
                                } else {
                                  var r
                                  ;(((r = {}).num = n), (r.my = e.money), (d = 1 * d + 1 * e.money), i.push(r), o++)
                                }
                              })
                            }),
                            o % 6 != 0)
                          )
                            (((c = {}).rows = i), a.push(c))
                          else if (o % 6 == 0) {
                            ;(((c = {}).rows = i), a.push(c))
                          }
                          ;(((f = {}).list = a),
                            (n = a),
                            (f.count = o),
                            (f.sum = d),
                            r(s).render(f, function (t) {
                              ;(l('#lotNumShow').show(), l('#showTable').html(t))
                            }))
                        } else {
                          e = 'input'
                          i = []
                          var c,
                            f,
                            h = 0
                          if (
                            (layui.$.each(t, function (t, e) {
                              layui.$.each(e.list, function (t, e) {
                                var n = {}
                                if (((n.num = e), i.push(n), ++h % 12 == 0)) {
                                  var l = {}
                                  ;((l.rows = i), a.push(l), (i = []))
                                }
                              })
                            }),
                            h % 12 != 0)
                          )
                            (((c = {}).rows = i), a.push(c))
                          ;(((f = {}).list = a),
                            (n = a),
                            (f.count = h),
                            r(u).render(f, function (e) {
                              ;(l('#lotNumShow').show(),
                                l('#showTable').html(e),
                                l('#lotMy').bind('input propertychange', function () {
                                  var e = l(this)
                                    .val()
                                    .replace(/[^0-9.]/gi, '')
                                  if (new RegExp(/^[0-9]+([.][0-9])?$/).test(e)) {
                                    if ((l(this).val(e), t.length > 0)) {
                                      a = layui.utils.numFormat(t[0].list.length * e, 2, !1)
                                      l('#sumMy').text(a)
                                    }
                                  } else if (
                                    ((e =
                                      (function (t, e) {
                                        var a = new RegExp(e, 'g'),
                                          n = t.match(a)
                                        return n ? n.length : 0
                                      })(e, '[.]') > 1
                                        ? e.substring(0, e.lastIndexOf('.'))
                                        : e.substring(0, e.indexOf('.') > 0 ? e.indexOf('.') + 2 : e.length)),
                                    l(this).val(e),
                                    t.length > 0)
                                  ) {
                                    var a = layui.utils.numFormat(t[0].list.length * e * 1, 2, !1)
                                    l('#sumMy').text(a)
                                  }
                                }),
                                l('#lotMy').on('keyup', function (t) {
                                  13 == t.keyCode && p()
                                }))
                            }))
                        }
                      })(o, i.msg))
                  }))
              })
            : r('<div class="closed">已封盘</div>').render(t, function (t) {
                ;(layui.main.container.content.html(t), o.render())
              })
        },
        clear: function () {
          ;(l('#tarea').text(''), l('#tarea').val(''), l('#showTable').html(''), l('#lotNumShow').hide(), o.render())
        },
        sureLot: p
      }))
  }),
  layui.define(function (t) {
    function e(t) {
      for (var e = {}, i = '', o = (t = t.replace(/\s/g, '#')).split('#'), s = [], u = t.replace(/[0-9=#]/g, ''), p = 0; p < o.length; p++) '' != o[p] && (t.indexOf('全倒') >= 0 && o[p].indexOf('全倒') >= 0 ? s.push(o[p]) : t.indexOf('全倒') >= 0 ? s.push(o[p] + u) : s.push(o[p]))
      var d = []
      for (p = 0; p < s.length; p++) {
        s[p] = s[p].replace(/[移]/g, '跑')
        var c = s[p].replace(/[^0-9xX]/gi, '')
        if (T(s[p])) d = j(s[p])
        else if (s[p].toUpperCase().indexOf('XXX') >= 0 && X(s[p].toUpperCase(), 'X') < 4) {
          if ((f = a(s[p])).msg && 'fail' == f.msg) {
            i = 'fail'
            break
          }
          d = d.concat(f.list)
        } else if (s[p].indexOf('跑') >= 0) d = k(s[p])
        else if (s[p].toUpperCase().indexOf('XX') >= 0 && X(s[p].toUpperCase(), 'X') < 3) {
          if ((f = O(s[p])).msg && 'fail' == f.msg) {
            i = 'fail'
            break
          }
          d = d.concat(f.list)
        } else if (c.length == s[p].length) {
          if ((f = l(s[p])).msg && 'fail' == f.msg) {
            i = 'fail'
            break
          }
          d = d.concat(f.list)
        } else if (r(s[p]) < 2 && r(s[p]) > 0) {
          if ((f = n(s[p])).msg && 'fail' == f.msg) {
            i = 'fail'
            break
          }
          d = d.concat(f.list)
        } else {
          if (!(r(s[p]) > 1)) {
            ;((d = []), (i = 'fail'))
            break
          }
          var f
          if ((f = n(s[p])).msg && 'fail' == f.msg) {
            i = 'fail'
            break
          }
          d = d.concat(f.list)
        }
      }
      return ('fail' == i && (e.msg = 'fail'), (e.list = d), e)
    }
    function a(t) {
      var e = ''
      if (5 == t.length) 2 == t.replace(/[^0-9]/gi, '').length && (e = t)
      else if (4 == t.length && 1 == t.replace(/[^0-9]/gi, '').length) e = t
      else {
        for (var a = t.split('XXX'), n = [], i = 0; i < a.length; i++) '' != a[i] && n.push(a[i])
        if (2 == n.length) {
          var l = m(y(n[0].replace(/[^0-9]/gi, ''))),
            r = m(y(n[1].replace(/[^0-9]/gi, '')))
          for (i = 0; i < l.length; i++) for (var o = 0; o < r.length; o++) e += '##' + l[i] + 'XXX' + r[o]
        } else {
          var s = y(t.replace(/[^0-9]/gi, ''))
          s = m(s)
          for (i = 0; i < s.length; i++) for (o = 0; o < s.length; o++) i != o && 0 == t.toUpperCase().indexOf('XXX') && (e += '##XXX' + s[i] + s[o])
        }
      }
      var u = []
      ;('' != e && '##' != e && (u = e.replace('##', '').split('##')), t.indexOf('除双重') >= 0 ? (u = v(u)) : t.indexOf('取双重') >= 0 && (u = b(u)))
      ;[].push(u)
      var p = {}
      return ((p.list = u), u.length < 1 && (p.msg = 'fail'), p)
    }
    function n(t) {
      for (
        var e = (function (t) {
            var e = [
                '顺二定',
                '顺三定',
                '顺四定',
                '上奖',
                '二定',
                '二字定',
                '三定',
                '三字定',
                '四定',
                '四字定',
                '取四重',
                '除四重',
                '取双重',
                '取双',
                '四字现',
                '四现',
                '全倒',
                '倒',
                '到',
                '跑',
                '移',
                '合',
                '和',
                '二字现',
                '二现',
                '三字现',
                '除双重',
                '取三重',
                '除三重',
                '除双',
                '三现',
                '千',
                '头',
                '百',
                '十',
                '尾',
                '个',
                '中肚',
                '百十',
                '二置',
                '三置',
                '四置',
                '二个置',
                '三个位置',
                '四个置'
              ],
              a = []
            if (
              (function (t, e) {
                ;(t.push('单'), t.push('双'), t.push('大'), t.push('小'))
                for (var a = 0; a < t.length; a++) e = e.replace(t[a], '')
                return ((e = e.replace(/[0-9]/g, '')), 0 != e.length)
              })(e, t)
            )
              return a
            for (var n = 0; n < e.length && '' != t && 0 != t.length; n++) {
              if (isNaN(t.charAt(0)) && '大' != t.charAt(0) && '小' != t.charAt(0) && '单' != t.charAt(0) && '双' != t.charAt(0)) {
                if (((p = t.indexOf(e[n])) >= 0 && '个' == e[n] && '位' == t.substr(p + 1, 1)) || (p >= 0 && '个' != e[n]) || (p >= 0 && '个' == e[n] && '位' != t.substr(p + 1, 1)))
                  if (0 == t.indexOf(e[n])) {
                    if ((((h = {}).play = e[n]), (t = t.replace(e[n], '')), isNaN(t.charAt(0))))
                      for (l = 4, n = 0; n < 4; n++) {
                        if (0 == (c = t.substring(0, l)).replace(/[大|小|单|双]/g, '').length) {
                          f = u(c)
                          ;((h.num = f.num), (t = t.substring(f.count)))
                          break
                        }
                        l--
                      }
                    else {
                      var i = t.substring(0, -1 == t.search(/[^0-9]/) ? t.length : t.search(/[^0-9]/))
                      if ('单' == (t = t.substring(-1 == t.search(/[^0-9]/) ? t.length : t.search(/[^0-9]/))).charAt(0) || '双' == t.charAt(0) || '小' == t.charAt(0) || '大' == t.charAt(0))
                        for (var l = 4, n = 0; n < 4; n++) {
                          if (0 == (c = t.substring(0, l)).replace(/[大|小|单|双]/g, '').length) {
                            ;((i += (f = u(c)).num), (t = t.substring(f.count)))
                            break
                          }
                          l--
                        }
                      h.num = i
                    }
                    a.push(h)
                  } else {
                    var r
                    if (0 != (r = t.split(e[n]))[1])
                      if (0 == r[1].replace(/[0-9]/g, '').length) {
                        ;(((h = {}).play = e[n]), (h.num = r[1]), a.push(h), (t = r[0]))
                      } else {
                        ;((s = r[1]), (d = ''))
                        if (isNaN(s.charAt(0))) {
                          ;((d += (f = u((c = s.substring(0, 4)))).num), (t = r[0] + s.substring(f.count)))
                        } else {
                          d = s.substring(0, s.search(/[^0-9]/))
                          for (l = 4, n = 0; n < 4; n++) {
                            if (0 != (c = s.substring(0, l)).replace(/[大|小|单|双]/g, '').length) l--
                            else ((d += (f = u(c)).num), (t = r[0] + s.substring(f.count)))
                          }
                        }
                        ;(((h = {}).play = e[n]), (h.num = d), a.push(h))
                      }
                    else (((h = {}).play = e[n]), a.push(h), (t = r[0]))
                  }
              } else if (((p = t.indexOf(e[n])) >= 0 && '个' == e[n] && '位' == t.substr(p + 1, 1)) || (p >= 0 && '个' != e[n]) || (p >= 0 && '个' == e[n] && '位' != t.substr(p + 1, 1)))
                if (0 == t.indexOf(e[n])) (((h = {}).play = e[n]), a.push(h), (t = t.replace(e[n], '')))
                else if ('' != (r = t.split(e[n]))[0]) {
                  var o = r[0].replace(/[0-9]/gi, '')
                  if ('' == o || 0 == o.length) {
                    ;(((h = {}).play = e[n]), (h.num = r[0]), a.push(h), (t = r[1]))
                  } else {
                    var s,
                      p,
                      d = ''
                    if (0 == (p = (s = y(r[0]).reverse().join('')).match(/[^0-9]/)).index) {
                      if ('单' == p[0]) ((d += '13579'), (d += (f = u((c = p.input.substring(0, 3)))).num), (t = p.input.substring(f.count) + r[1]))
                      else if ('双' == p[0]) {
                        ;((d += '02468'), (d += (f = u((c = p.input.substring(0, 3)))).num), (t = p.input.substring(f.count) + r[1]))
                      } else if ('小' == p[0]) {
                        ;((d += '01234'), (d += (f = u((c = p.input.substring(0, 3)))).num), (t = p.input.substring(f.count) + r[1]))
                      } else if ('大' == p[0]) {
                        var c, f
                        ;((d += '56789'), (d += (f = u((c = p.input.substring(0, 3)))).num), (t = p.input.substring(f.count) + r[1]))
                      } else ((d = ''), (t = r[0] + r[1]))
                      d = m(d).join('')
                    } else ((d = y(s.slice(0, p.index)).reverse().join('')), (t = y(s.substring(p.index)).reverse().join('') + r[1]))
                    ;(((h = {}).play = e[n]), (h.num = d), a.push(h))
                  }
                } else {
                  var h
                  ;(((h = {}).play = e[n]), a.push(h), (t = r[1]))
                }
            }
            return a
          })(t),
          a = '千百十个头尾中肚',
          n = '',
          i = 0;
        i < e.length;
        i++
      ) {
        var l = e[i]
        if (a.indexOf(l.play) >= 0 && '' != l.num && null != l.num) {
          n = l.num
          break
        }
      }
      layui.$.each(e, function (t, e) {
        a.indexOf(e.play) >= 0 && ('' == e.num || null == e.num) && (e.num = n)
      })
      var r = []
      if (e && e.length > 0) {
        var O = {},
          k = (function (t) {
            var e = {}
            return (
              layui.$.each(t, function (t, a) {
                '顺二定' == a.play
                  ? ((e.type = 2), (e.tp = 'posi'))
                  : '顺三定' == a.play
                    ? ((e.type = 3), (e.tp = 'posi'))
                    : '顺四定' == a.play
                      ? ((e.type = 4), (e.tp = 'posi'))
                      : '二定' == a.play || '二字定' == a.play
                        ? ((e.type = 2), (e.tp = 'posi'))
                        : '三定' == a.play || '三字定' == a.play
                          ? ((e.type = 3), (e.tp = 'posi'))
                          : '四定' == a.play || '四字定' == a.play
                            ? ((e.type = 4), (e.tp = 'posi'))
                            : '四字现' == a.play || '四现' == a.play
                              ? ((e.type = 4), (e.tp = 'appear'))
                              : '二字现' == a.play || '二现' == a.play
                                ? ((e.type = 2), (e.tp = 'appear'))
                                : ('三字现' != a.play && '三现' != a.play) || ((e.type = 3), (e.tp = 'appear'))
              }),
              e
            )
          })(e)
        ;(k && k.type && (_ = k.type),
          layui.$.each(e, function (t, e) {
            '千' == e.play || '头' == e.play
              ? O['千']
                ? (O['千'] = O['千'] + e.num)
                : (O['千'] = e.num)
              : '个' == e.play || '尾' == e.play
                ? O['个']
                  ? (O['个'] = O['个'] + e.num)
                  : (O['个'] = e.num)
                : '中肚' == e.play || '百十' == e.play
                  ? (O['百'] ? (O['百'] = O['百'] + e.num) : (O['百'] = e.num), O['十'] ? (O['十'] = O['十'] + e.num) : (O['十'] = e.num))
                  : '百' == e.play
                    ? O['百']
                      ? (O['百'] = O['百'] + e.num)
                      : (O['百'] = e.num)
                    : '十' == e.play && (O['十'] ? (O['十'] = O['十'] + e.num) : (O['十'] = e.num))
          }))
        var _ = 2,
          j = x(O)
        ;(O && (_ = x(O) < 2 ? 2 : x(O)),
          (r = _
            ? (function (t, e) {
                t = o(t)
                var a = '',
                  n = []
                for (var i in t) n.push(i)
                if (2 == e) {
                  var l = ['OOXX', 'OXOX', 'OXXO', 'XXOO', 'XOXO', 'XOOX']
                  if (1 == n.length)
                    for (var r = 0; r < l.length; r++)
                      for (var s = y(t[n[0]]), u = 0; u < s.length; u++)
                        for (var p = 0; p < 10; p++) {
                          if ('O' == (f = y(l[r]))[n[0]]) ((f[n[0]] = s[u]), (a += '##' + f.join('').replace('O', u)))
                        }
                  else if (2 == n.length)
                    for (r = 0; r < l.length; r++)
                      for (s = y(t[n[0]]), u = 0; u < s.length; u++) {
                        var d = y(t[n[1]])
                        for (p = 0; p < d.length; p++) {
                          if ('O' == (f = y(l[r]))[n[0]] && 'O' == f[n[1]]) ((f[n[0]] = s[u]), (f[n[1]] = d[p]), (a += '##' + f.join('')))
                        }
                      }
                } else if (3 == e) {
                  l = ['XOOO', 'OOOX', 'OXOO', 'OOXO']
                  if (1 == n.length)
                    for (r = 0; r < l.length; r++)
                      for (s = y(t[n[0]]), u = 0; u < s.length; u++)
                        for (p = 0; p < 10; p++)
                          for (var c = 0; c < 10; c++) {
                            if ('O' == (f = y(l[r]))[n[0]]) ((f[n[0]] = s[u]), (a += '##' + f.join('').replace('O', c).replace('O', p)))
                          }
                  else if (2 == n.length)
                    for (r = 0; r < l.length; r++)
                      for (s = y(t[n[0]]), u = 0; u < s.length; u++)
                        for (d = y(t[n[1]]), p = 0; p < d.length; p++)
                          for (c = 0; c < 10; c++) {
                            var f
                            if ('O' == (f = y(l[r]))[n[0]] && 'O' == f[n[1]]) ((f[n[0]] = s[u]), (f[n[1]] = d[p]), (a += '##' + f.join('').replace('O', c)))
                          }
                  else if (3 == n.length) {
                    var h = y(t[n[0]])
                    for (r = 0; r < h.length; r++) {
                      var m = y(t[n[1]])
                      for (u = 0; u < m.length; u++)
                        for (s = y(t[n[2]]), p = 0; p < s.length; p++) {
                          ;(((v = y('XXXX'))[n[0]] = h[r]), (v[n[1]] = m[u]), (v[n[2]] = s[p]), (a += '##' + v.join('')))
                        }
                    }
                  }
                } else if (4 == e)
                  if (1 == n.length)
                    for (h = y(t[n[0]]), r = 0; r < h.length; r++)
                      for (u = 0; u < 10; u++)
                        for (p = 0; p < 10; p++)
                          for (c = 0; c < 10; c++) {
                            ;(((v = y('XXXX'))[n[0]] = h[r]), (a += '##' + v.join('').replace('X', u).replace('X', p).replace('X', c)))
                          }
                  else if (2 == n.length)
                    for (h = y(t[n[0]]), r = 0; r < h.length; r++) {
                      var g = y(t[n[1]])
                      for (u = 0; u < g.length; u++)
                        for (p = 0; p < 10; p++)
                          for (c = 0; c < 10; c++) {
                            ;(((v = y('XXXX'))[n[0]] = h[r]), (v[n[1]] = g[u]), (a += '##' + v.join('').replace('X', u).replace('X', p)))
                          }
                    }
                  else if (3 == n.length)
                    for (h = y(t[n[0]]), r = 0; r < h.length; r++)
                      for (m = y(t[n[1]]), u = 0; u < m.length; u++)
                        for (s = y(t[n[2]]), p = 0; p < s.length; p++)
                          for (c = 0; c < 10; c++) {
                            ;(((v = y('XXXX'))[n[0]] = h[r]), (v[n[1]] = m[u]), (v[n[2]] = s[p]), (a += '##' + v.join('').replace('X', c)))
                          }
                  else if (4 == n.length)
                    for (h = y(t[n[0]]), r = 0; r < h.length; r++)
                      for (m = y(t[n[1]]), u = 0; u < m.length; u++)
                        for (s = y(t[n[2]]), p = 0; p < s.length; p++) {
                          var b = y(t[n[3]])
                          for (c = 0; c < b.length; c++) {
                            var v
                            ;(((v = y('XXXX'))[n[0]] = h[r]), (v[n[1]] = m[u]), (v[n[2]] = s[p]), (v[n[3]] = b[c]), (a += '##' + v.join('')))
                          }
                        }
                var O = []
                '' != a && '##' != a && (O = a.replace('##', '').split('##'))
                return O
              })(O, _)
            : (function (t, e) {
                t = o(t)
                var a = ''
                if (1 == e) {
                  var n = 0,
                    i = ''
                  for (var l in t) i = t[(n = l)]
                  for (var r = ['OOXX', 'OXOX', 'OXXO', 'XXOO', 'XOXO', 'XOOX'], s = 0; s < r.length; s++) {
                    var u = y(r[s])
                    if (((u[n] = 'O'), !(X(u.join(''), 'X') < 2)))
                      for (var p = y(i), d = 0; d < i.length; d++)
                        for (var c = 0; c < 10; c++) {
                          var f = y(r[s])
                          ;((f[n] = p[d]), (a += '##' + f.join('').replace('O', c)))
                        }
                  }
                } else if (2 == e) {
                  var h = []
                  for (var l in t) h.push(l)
                  var m = y(t[h[0]])
                  for (s = 0; s < m.length; s++) {
                    var g = y(t[h[1]])
                    for (d = 0; d < g.length; d++) {
                      ;(((x = y('XXXX'))[h[0]] = m[s]), (x[h[1]] = g[d]), (a += '##' + x.join('')))
                    }
                  }
                } else if (3 == e) {
                  h = []
                  for (var l in t) h.push(l)
                  for (m = y(t[h[0]]), s = 0; s < m.length; s++)
                    for (g = y(t[h[1]]), d = 0; d < g.length; d++)
                      for (var b = y(t[h[2]]), v = 0; v < b.length; v++) {
                        ;(((x = y('XXXX'))[h[0]] = m[s]), (x[h[1]] = g[d]), (x[h[2]] = b[v]), (a += '##' + x.join('')))
                      }
                } else if (4 == e) {
                  h = []
                  for (var l in t) h.push(l)
                  for (m = y(t[h[0]]), s = 0; s < m.length; s++)
                    for (g = y(t[h[1]]), d = 0; d < g.length; d++)
                      for (b = y(t[h[2]]), v = 0; v < b.length; v++) {
                        var O = y(t[h[3]])
                        for (c = 0; c < O.length; c++) {
                          var x
                          ;(((x = y('XXXX'))[h[0]] = m[s]), (x[h[1]] = g[d]), (x[h[2]] = b[v]), (x[h[3]] = O[c]), (a += '##' + x.join('')))
                        }
                      }
                }
                var k = []
                '' != a && '##' != a && (k = a.replace('##', '').split('##'))
                return k
              })(O, _)))
        var T
        t = 'posi'
        return (
          layui.$.each(e, function (e, a) {
            '顺二定' == a.play
              ? ((_ = 2), (t = 'posi'), r.length < 1 ? (r = g(a.num, _)) : j == _ ? (r = r.intersectArr(g(a.num, _))) : j < _ && s(O, _, j))
              : '顺三定' == a.play
                ? ((_ = 3), (t = 'posi'), r.length < 1 ? (r = g(a.num, _)) : j == _ ? (r = r.intersectArr(g(a.num, _))) : j < _ && (r = s(O, _, j)))
                : '顺四定' == a.play
                  ? ((_ = 4), (t = 'posi'), r.length < 1 ? (r = g(a.num, _)) : _ == j ? (r = r.intersectArr(g(a.num, _))) : j < _ && (r = s(O, _, j)))
                  : '二定' == a.play || '二字定' == a.play
                    ? ((_ = 2), (t = 'posi'), r.length < 1 ? (r = d(a.num, _)) : j == _ ? (r = r.intersectArr(d(a.num, _))) : j < _ && (r = s(O, _, j)))
                    : '三定' == a.play || '三字定' == a.play
                      ? ((_ = 3), (t = 'posi'), r.length < 1 ? (r = d(a.num, _)) : j == _ ? (r = r.intersectArr(d(a.num, _))) : j < _ && (r = s(O, _, j)))
                      : '四定' == a.play || '四字定' == a.play
                        ? ((_ = 4), (t = 'posi'), r.length < 1 ? (r = d(a.num, _)) : j == _ ? (r = r.intersectArr(d(a.num, _))) : j < _ && (r = s(O, _, j)))
                        : '四字现' == a.play || '四现' == a.play
                          ? ((_ = 4), (t = 'appear'), (r = r.length < 1 ? f(a.num, _) : r.intersectArr(f(a.num, _))))
                          : '二字现' == a.play || '二现' == a.play
                            ? ((_ = 2), (t = 'appear'), (r = r.length < 1 ? f(a.num, _) : r.intersectArr(f(a.num, _))))
                            : '三字现' == a.play || '三现' == a.play
                              ? ((_ = 3), (t = 'appear'), (r = r.length < 1 ? f(a.num, _) : r.intersectArr(f(a.num, _))))
                              : '全倒' == a.play || '倒' == a.play || '到' == a.play
                                ? (r = r.length < 1 ? p(a.num, _) : r.intersectArr(p(a.num, _)))
                                : '跑' == a.play ||
                                  '移' == a.play ||
                                  ('合' == a.play || '和' == a.play
                                    ? (r = r.length < 1 ? h(a.num, _) : r.intersectArr(h(a.num, _)))
                                    : '上奖' == a.play
                                      ? (r = r.length < 1 ? p(a.num, _) : r.intersectArr(p(a.num, _)))
                                      : '二置' == a.play || '二个置' == a.play
                                        ? (r = r.length < 1 ? c(a.num, 2) : r.intersectArr(c(a.num, 2)))
                                        : '三置' == a.play || '三个置' == a.play
                                          ? (r = r.length < 1 ? c(a.num, 3) : r.intersectArr(c(a.num, 3)))
                                          : '四置' == a.play || '四个置' == a.play
                                            ? (r = r.length < 1 ? c(a.num, 4) : r.intersectArr(c(a.num, 4)))
                                            : '取双重' == a.play || '取双' == a.play
                                              ? (r = b(r))
                                              : '除双重' == a.play || '除双' == a.play
                                                ? (r = v(r))
                                                : '取三重' == a.play
                                                  ? (r = w(r, 'get'))
                                                  : '除三重' == a.play
                                                    ? (r = w(r, 'move'))
                                                    : '取四重' == a.play
                                                      ? (r = M(r, 'get'))
                                                      : '除四重' == a.play && (r = M(r, 'move')))
          }),
          ((T = {}).list = r),
          r.length < 1 && (T.msg = 'fail'),
          T
        )
      }
      return (T = {
        msg: 'fail'
      })
    }
    function l(t) {
      if (t.length > 1 && t.length < 5) {
        if (X(t.toUpperCase(), 'X') > 0 && X(t.toUpperCase(), 'X') < 3 && 4 == t.length) {
          var e = [],
            a = {},
            n = [t.toUpperCase()]
          return (e.push(n), (a.list = e), a)
        }
        if (t.length <= 4 && t.length > 1 && 0 == X(t.toUpperCase(), 'X')) {
          ;((e = []), (a = {}))
          if (t.length < 4) {
            n = ['A' + t.toUpperCase()]
            e.push(n)
          } else {
            n = [t.toUpperCase()]
            e.push(n)
          }
          return ((a.list = e), a)
        }
        return (a = {
          msg: 'fail'
        })
      }
      if (5 == t.length) {
        var i = t.replace(/[0-9]/g, 'O')
        if ('OXXXO' == i || 'XXXOO' == i) {
          e = []
          var a = {}
          n = [t.toUpperCase()]
          return (e.push(n), (a.list = e), a)
        }
        return (a = {
          msg: 'fail'
        })
      }
      return (a = {
        msg: 'fail'
      })
    }
    function r(t) {
      for (
        var e = 0,
          a = [
            '上奖',
            '二定',
            '二字定',
            '三定',
            '三字定',
            '四定',
            '四字定',
            '二字现',
            '二现',
            '三字现',
            '三现',
            '取双',
            '除双',
            '取四重',
            '除四重',
            '取双重',
            '除双重',
            '取三重',
            '除三重',
            '四字现',
            '四现',
            '全倒',
            '倒',
            '到',
            '跑',
            '移',
            '合',
            '和',
            '顺二定',
            '顺三定',
            '顺四定',
            '二置',
            '三置',
            '四置',
            '二个置',
            '三个置',
            '四个置'
          ],
          n = ['千', '头', '百', '十', '尾', '个', '中肚', '百十'],
          i = 0;
        i < a.length;
        i++
      )
        if (t.indexOf(a[i]) >= 0) {
          e++
          break
        }
      for (i = 0; i < n.length; i++)
        if (t.indexOf(n[i]) >= 0) {
          e++
          break
        }
      return e
    }
    function o(t) {
      var e = {},
        a = {
          千: 0,
          百: 1,
          十: 2,
          个: 3
        }
      for (var n in t) t.hasOwnProperty(n) && (e[a[n]] = m(t[n]).join(''))
      return e
    }
    function s(t, e, a) {
      var n = ''
      if (((map = o(t)), 2 == e)) {
        var i = ['OOXX', 'OXOX', 'OXXO', 'XXOO', 'XOXO', 'XOOX']
        if (1 == a) {
          var l = []
          for (var r in map)
            for (var s = 0; s < i.length; s++) {
              'O' == y(i[s])[r] && l.push(i[s])
            }
          for (var r in map)
            for (var u = 0; u < l.length; u++) {
              var p = y(map.ky)
              for (s = 0; s < p; s++)
                for (var d = 0; d <= 9; d++) {
                  ;(((O = y(l[u]))[r] = p[s]), (n += '##' + O.join('').replace('O', d)))
                }
            }
        }
      } else if (3 == e) {
        i = ['XOOO', 'OOOX', 'OXOO', 'OOXO']
        if (1 == a) {
          l = []
          for (var r in map)
            for (s = 0; s < i.length; s++) {
              'O' == y(i[s])[r] && l.push(i[s])
            }
          for (var r in map)
            for (u = 0; u < l.length; u++)
              for (p = y(map.ky), s = 0; s < p; s++)
                for (d = 0; d <= 9; d++)
                  for (var c = 0; c <= 9; c++) {
                    ;(((O = y(l[u]))[r] = p[s]), (n += '##' + O.join('').replace('O', d).replace('O', c)))
                  }
        } else if (2 == a) {
          l = []
          var f = [],
            h = [],
            m = 0,
            g = y('XXXX')
          for (var r in map) 0 == m ? ((f = y(map[r])), (g[r] = 'K'), m++) : ((h = y(map[r])), (g[r] = 'K'))
          var b = g.join('')
          for (u = 0; u < f.length; u++)
            for (s = 0; s < h.length; s++)
              for (d = 0; d <= 9; d++) {
                ;((n += '##' + (x = (x = (x = b.replace('K', f[u])).replace('K', h[s])).replace('X', 'A')).replace('A', d)), (n += '##' + x.replace('X', d).replace('A', 'X')))
              }
        }
      } else if (4 == e)
        if (1 == a) {
          l = []
          for (var r in map)
            for (u = 0; u < l.length; u++)
              for (p = y(map.ky), s = 0; s < p; s++)
                for (d = 0; d <= 9; d++)
                  for (c = 0; c <= 9; c++)
                    for (var v = 0; v <= 9; v++) {
                      var O
                      ;(((O = y('XXXX'))[r] = p[s]), (n += '##' + O.join('').replace('X', d).replace('X', c).replace('X', v)))
                    }
        } else if (2 == a) {
          ;((l = []), (f = []), (h = []), (m = 0), (g = y('XXXX')))
          for (var r in map) 0 == m ? ((f = y(map[r])), (g[r] = 'K'), m++) : ((h = y(map[r])), (g[r] = 'K'))
          for (b = g.join(''), u = 0; u < f.length; u++)
            for (s = 0; s < h.length; s++)
              for (d = 0; d <= 9; d++)
                for (v = 0; v <= 9; v++) {
                  n += '##' + (x = (x = (x = b.replace('K', f[u])).replace('K', h[s])).replace('X', d)).replace('X', v)
                }
        } else if (3 == a) {
          ;((l = []), (f = []), (h = []))
          var X = []
          ;((m = 0), (g = y('XXXX')))
          for (var r in map) 0 == m ? ((f = y(map[r])), (g[r] = 'K'), m++) : 1 == m ? ((h = y(map[r])), (g[r] = 'K'), m++) : ((X = y(map[r])), (g[r] = 'K'))
          for (b = g.join(''), u = 0; u < f.length; u++)
            for (s = 0; s < h.length; s++)
              for (d = 0; d < X.length; d++)
                for (v = 0; v <= 9; v++) {
                  var x
                  n += '##' + (x = (x = (x = b.replace('K', f[u])).replace('K', h[s])).replace('K', X[d])).replace('X', v)
                }
        }
      var k = []
      return ('' != n && '##' != n && (k = n.replace('##', '').split('##')), k)
    }
    function u(t) {
      var e = '',
        a = 0
      ;(t.indexOf('单') >= 0 && ((e += '13579'), a++), t.indexOf('双') >= 0 && ((e += '02468'), a++), t.indexOf('小') >= 0 && ((e += '01234'), a++), t.indexOf('大') >= 0 && ((e += '56789'), a++))
      var n = {}
      return ((n.num = e), (n.count = a), n)
    }
    function p(t, e) {
      var a = ''
      if (2 == e)
        for (var n = y(t), i = ['XXOO', 'XOXO', 'XOOX', 'OXOX', 'OOXX', 'OXXO'], l = 0; l < i.length; l++)
          for (var r = 0; r < n.length; r++)
            for (var o = 0; o < n.length; o++) {
              if (r != o) a += '##' + i[l].replace('O', n[r]).replace('O', n[o])
            }
      else if (3 == e)
        for (n = y(t), i = ['XOOO', 'OXOO', 'OOXO', 'OOOX'], l = 0; l < i.length; l++)
          for (r = 0; r < n.length; r++)
            for (o = 0; o < n.length; o++)
              for (var s = 0; s < n.length; s++) {
                if (r != o && r != s && o != s) a += '##' + i[l].replace('O', n[r]).replace('O', n[o]).replace('O', n[s])
              }
      else if (4 == e)
        for (n = y(t), r = 0; r < n.length; r++)
          for (o = 0; o < n.length; o++)
            for (s = 0; s < n.length; s++)
              for (var u = 0; u < n.length; u++) {
                if (r != o && r != s && o != s && s != u && r != u && o != u) a += '##' + [n[r], n[o], n[s], n[u]].join('')
              }
      var p = []
      return ('' != a && '##' != a && (p = a.replace('##', '').split('##')), p)
    }
    function d(t, e) {
      var a = ''
      if (t && '' != t) {
        var n = y(t)
        if (2 == e)
          for (i = ['XXOO', 'OOXX', 'XOXO', 'XOOX', 'OXXO', 'OXOX'], l = 0; l < i.length; l++)
            for (r = 0; r < n.length; r++)
              for (o = 0; o < n.length; o++) {
                if (r != o) a += '##' + i[l].replace('O', n[r]).replace('O', n[o])
              }
        else if (3 == e)
          for (i = ['XOOO', 'OOOX', 'OXOO', 'OOXO'], l = 0; l < i.length; l++)
            for (r = 0; r < n.length; r++)
              for (o = 0; o < n.length; o++)
                for (s = 0; s < n.length; s++) {
                  if (r != o && r != s && s != o) a += '##' + i[l].replace('O', n[r]).replace('O', n[o]).replace('O', n[s])
                }
        else if (4 == e)
          for (l = 0; l < n.length; l++)
            for (r = 0; r < n.length; r++)
              for (o = 0; o < n.length; o++)
                for (s = 0; s < n.length; s++) {
                  if (r != o && r != s && s != o && l != r && l != s && l != o) a += '##' + [n[l], n[r], n[o], n[s]].join('')
                }
      } else if (2 == e)
        for (var i = ['XXOO', 'OOXX', 'XOXO', 'XOOX', 'OXXO', 'OXOX'], l = 0; l < i.length; l++)
          for (var r = 0; r < 10; r++)
            for (var o = 0; o < 10; o++) {
              a += '##' + i[l].replace('O', r).replace('O', o)
            }
      else if (3 == e)
        for (var i = ['XOOO', 'OOOX', 'OXOO', 'OOXO'], l = 0; l < i.length; l++)
          for (var r = 0; r < 10; r++)
            for (var o = 0; o < 10; o++)
              for (var s = 0; s < 10; s++) {
                a += '##' + i[l].replace('O', r).replace('O', o).replace('O', s)
              }
      else if (4 == e)
        for (var l = 0; l < 10; l++)
          for (var r = 0; r < 10; r++)
            for (var o = 0; o < 10; o++)
              for (var s = 0; s < 10; s++) {
                a += '##' + [l, r, o, s].join('')
              }
      var u = []
      return ('' != a && '##' != a && (u = a.replace('##', '').split('##')), (u = m(u)))
    }
    function c(t, e) {
      var a = m(t),
        n = ''
      if (2 == e)
        for (var i = ['XXOO', 'OOXX', 'XOXO', 'XOOX', 'OXXO', 'OXOX'], l = 0; l < i.length; l++)
          for (var r = 0; r < a.length; r++)
            for (var o = 0; o < a.length; o++) {
              n += '##' + i[l].replace('O', a[r]).replace('O', a[o])
            }
      else if (3 == e)
        for (i = ['XOOO', 'OOOX', 'OXOO', 'OOXO'], l = 0; l < i.length; l++)
          for (r = 0; r < a.length; r++)
            for (o = 0; o < a.length; o++)
              for (var s = 0; s < a.length; s++) {
                n += '##' + i[l].replace('O', a[r]).replace('O', a[o]).replace('O', a[s])
              }
      else if (4 == e)
        for (l = 0; l < a.length; l++)
          for (r = 0; r < a.length; r++)
            for (o = 0; o < a.length; o++)
              for (s = 0; s < a.length; s++) {
                n += '##' + [a[l], a[r], a[o], a[s]].join('')
              }
      var u = []
      return ('' != n && '##' != n && (u = n.replace('##', '').split('##')), u)
    }
    function f(t, e) {
      var a = '',
        n = y(t)
      if (2 == e) {
        for (var i = 0; i < n.length; i++)
          for (var l = 0; l < n.length; l++)
            if (i != l) {
              var r = [n[i], n[l]].sort().join('')
              a.indexOf(r) < 0 && (a += '##A' + r)
            }
      } else if (3 == e) {
        for (i = 0; i < n.length; i++)
          for (l = 0; l < n.length; l++)
            for (var o = 0; o < n.length; o++)
              if (i != l && i != o && l != o) {
                r = [n[i], n[l], n[o]].sort().join('')
                a.indexOf(r) < 0 && (a += '##A' + r)
              }
      } else if (4 == e)
        for (var s = 0; s < n.length; s++)
          for (i = 0; i < n.length; i++)
            for (l = 0; l < n.length; l++)
              for (o = 0; o < n.length; o++)
                if (i != l && i != o && i != s && l != o && l != s && o != s) {
                  r = [n[i], n[l], n[o], n[s]].sort().join('')
                  a.indexOf(r) < 0 && (a += '##A' + r)
                }
      var u = []
      return ('' != a && '##' != a && (u = a.replace('##', '').split('##')), u)
    }
    function h(t, e) {
      if (!t || '' == t) return []
      var a = ''
      if (2 == e)
        for (var n = ['XXOO', 'XOXO', 'XOOX', 'OXOX', 'OOXX', 'OXXO'], i = 0; i < n.length; i++)
          for (var l = 0; l < 10; l++)
            for (var r = 0; r < 10; r++) {
              var o = (u = l + r + '').substring(u.length - 1)
              if (t.indexOf(o) >= 0) a += '##' + n[i].replace('O', l).replace('O', r)
            }
      else if (3 == e)
        for (n = ['XOOO', 'OXOO', 'OOXO', 'OOOX'], i = 0; i < n.length; i++)
          for (l = 0; l < 10; l++)
            for (r = 0; r < 10; r++)
              for (var s = 0; s < 10; s++) {
                o = (u = l + r + s + '').substring(u.length - 1)
                if (t.indexOf(o) >= 0) a += '##' + n[i].replace('O', l).replace('O', r).replace('O', s)
              }
      else if (4 == e)
        for (i = 0; i < 10; i++)
          for (l = 0; l < 10; l++)
            for (r = 0; r < 10; r++)
              for (s = 0; s < 10; s++) {
                var u
                o = (u = i + l + r + s + '').substring(u.length - 1)
                if (t.indexOf(o) >= 0) a += '##' + [i, l, r, s].join('')
              }
      var p = []
      return ('' != a && '##' != a && (p = a.replace('##', '').split('##')), p)
    }
    function m(t) {
      for (var e, a = y(t), n = [], i = {}, l = 0; null != (e = a[l]); l++) i[e] || (n.push(e), (i[e] = !0))
      return n
    }
    function y(t) {
      if (!t || '' == t) return []
      if ('string' == typeof t) {
        for (var e = [], a = 0; a < t.length; a++) e.push(t.charAt(a))
        return e
      }
      return t
    }
    function g(t, e) {
      var a = '',
        n = y(t)
      if (2 == e)
        for (var i = ['XXOO', 'XOXO', 'XOOX', 'OXOX', 'OOXX', 'OXXO'], l = 0; l < i.length; l++)
          for (var r = 0; r < n.length - 1; r++) {
            a += '##' + i[l].replace('O', n[r]).replace('O', n[r + 1])
          }
      else if (3 == e)
        for (i = ['XOOO', 'OXOO', 'OOXO', 'OOOX'], l = 0; l < i.length; l++)
          for (r = 0; r < n.length - 2; r++) {
            a +=
              '##' +
              i[l]
                .replace('O', n[r])
                .replace('O', n[r + 1])
                .replace('O', n[r + 2])
          }
      else if (4 == e)
        for (r = 0; r < n.length - 3; r++) {
          a +=
            '##' +
            'OOOO'
              .replace('O', n[r])
              .replace('O', n[r + 1])
              .replace('O', n[r + 2])
              .replace('O', n[r + 3])
        }
      var o = []
      return ('' != a && '##' != a && (o = a.replace('##', '').split('##')), (o = m(o)))
    }
    function b(t) {
      var e = []
      return (
        layui.$.each(t, function (t, a) {
          var n = []
          _(a.replace(/[^0-9]/gi, ''), 2) && (n.push(a), (n = m(n)), e.push(n))
        }),
        e
      )
    }
    function v(t) {
      var e = []
      return (
        layui.$.each(t, function (t, a) {
          var n = []
          _(a.replace(/[^0-9]/gi, ''), 2) || (n.push(a), (n = m(n)), e.push(n))
        }),
        e
      )
    }
    function O(t) {
      var e = ''
      if (4 == t.length) 2 == t.replace(/[^0-9]/gi, '').length && (e = t)
      else {
        for (var a = t.split('XX'), n = [], i = 0; i < a.length; i++) '' != a[i] && n.push(a[i])
        if (2 == n.length) {
          var l = m(y(n[0].replace(/[^0-9]/gi, ''))),
            r = m(y(n[1].replace(/[^0-9]/gi, '')))
          for (i = 0; i < l.length; i++) for (var o = 0; o < r.length; o++) e += '##' + l[i] + 'XX' + r[o]
        } else {
          var s = y(t.replace(/[^0-9]/gi, ''))
          s = m(s)
          for (i = 0; i < s.length; i++) for (o = 0; o < s.length; o++) i != o && (0 == t.toUpperCase().indexOf('XX') ? (e += '##XX' + s[i] + s[o]) : (e += '##' + s[i] + s[o] + 'XX'))
        }
      }
      var u = []
      ;('' != e && '##' != e && (u = e.replace('##', '').split('##')), t.indexOf('除双重') >= 0 ? (u = v(u)) : t.indexOf('取双重') >= 0 && (u = b(u)))
      ;[].push(u)
      var p = {}
      return ((p.list = u), u.length < 1 && (p.msg = 'fail'), p)
    }
    function X(t, e) {
      var a = new RegExp(e, 'g'),
        n = t.match(a)
      return n ? n.length : 0
    }
    function x(t) {
      var e = 0
      for (var a in t) e++
      return e
    }
    function k(t) {
      for (var e = ['头跑', '尾跑', '千跑', '百跑', '十跑', '个跑', '中肚跑'], a = [], n = '', i = 2, l = '', r = '', o = 0; o < e.length; o++)
        if (t.indexOf(e[o]) >= 0) {
          ;((a = t.split(e[o])), (n = e[o]))
          break
        }
      for (o = 0; o < a.length; o++) {
        var s, u
        if (0 == o) ((u = (s = a[o]).replace(/[^0-9]/g, '')).length == s.length || (s.indexOf('大') >= 0 && (u += '56789'), s.indexOf('小') >= 0 && (u += '01234'), s.indexOf('单') >= 0 && (u += '13579'), s.indexOf('双') >= 0 && (u += '02468')), (l = u))
        else
          ((a[o].indexOf('三定') >= 0 || a[o].indexOf('三字定') >= 0) && ((i = 3), (a[o] = a[o].replace('三定', '').replace('三字定', ''))),
            (a[o].indexOf('四定') >= 0 || a[o].indexOf('四字定') >= 0) && ((i = 4), (a[o] = a[o].replace('四定', '').replace('四字定', ''))),
            (u = (s = a[o]).replace(/[^0-9]/g, '')).length == a[o].length || (s.indexOf('大') >= 0 && (u += '56789'), s.indexOf('小') >= 0 && (u += '01234'), s.indexOf('单') >= 0 && (u += '13579'), s.indexOf('双') >= 0 && (u += '02468')),
            (r = u))
      }
      return (function (t, e, a, n) {
        var i = y('XXXX'),
          l = y(e),
          r = y(a),
          o = 0,
          s = ''
        ;(t.indexOf('头') >= 0 || t.indexOf('千') >= 0) && ((i[0] = 'K'), o++)
        ;(t.indexOf('尾') >= 0 || t.indexOf('个') >= 0) && ((i[3] = 'K'), o++)
        t.indexOf('百') >= 0 && ((i[1] = 'K'), o++)
        t.indexOf('十') >= 0 && ((i[2] = 'K'), o++)
        t.indexOf('中肚') >= 0 && ((i[1] = 'K'), (i[2] = 'K'), (o += 2))
        if (o == n && 2 == n) return []
        if (2 == n) {
          for (var u = i.join(''), p = 0; p < l.length; p++)
            for (var d = y(u), c = 0; c < d.length; c++)
              if ('K' != d[c])
                for (var f = 0; f < r.length; f++) {
                  var h = d
                  ;((h[c] = r[f]), (s += '##' + h.join('').replace('K', l[p])), (d = y(u)))
                }
        } else if (3 == n) {
          u = i.join('')
          if (2 == o) {
            var m = []
            for (c = 0; c < i.length; c++) {
              if ('K' != i[c]) (((b = y(u))[c] = 'G'), m.push(b.join('')))
            }
            for (p = 0; p < m.length; p++)
              for (c = 0; c < l.length; c++)
                for (f = 0; f < l.length; f++)
                  for (var g = 0; g < r.length; g++) {
                    s += '##' + m[p].replace('K', l[c]).replace('K', l[f]).replace('X', r[g]).replace('G', 'X')
                  }
          } else {
            for (i.join(''), m = [], c = 0; c < i.length; c++) {
              var b
              if ('K' != i[c]) (((b = y(u))[c] = 'G'), m.push(b.join('')))
            }
            for (p = 0; p < m.length; p++)
              for (c = 0; c < l.length; c++)
                for (f = 0; f < r.length; f++)
                  for (g = 0; g < r.length; g++) {
                    if (f != g) s += '##' + m[p].replace('K', l[c]).replace('X', r[f]).replace('X', r[g]).replace('G', 'X')
                  }
          }
        } else if (4 == n)
          if (2 == o)
            for (c = 0; c < l.length; c++)
              for (f = 0; f < l.length; f++)
                for (g = 0; g < r.length; g++)
                  for (var v = 0; v < r.length; v++) {
                    if (g != v) s += '##' + i.join('').replace('K', l[c]).replace('K', l[f]).replace('X', r[g]).replace('X', r[v])
                  }
          else
            for (c = 0; c < l.length; c++)
              for (f = 0; f < r.length; f++)
                for (g = 0; g < r.length; g++)
                  for (v = 0; v < r.length; v++) {
                    if (g != v && f != v && f != g) s += '##' + i.join('').replace('K', l[c]).replace('X', r[f]).replace('X', r[g]).replace('X', r[v])
                  }
        var O = []
        return ('' != s && (O = s.replace('##', '').split('##')), O)
      })(n, l, r, i)
    }
    function w(t, e) {
      for (var a = [], n = 0; n < t.length; n++) 'get' == e ? _(t[n], 3) && a.push(t[n]) : 'move' == e && (_(t[n], 3) || a.push(t[n]))
      return a
    }
    function M(t, e) {
      for (var a = [], n = 0; n < t.length; n++) 'get' == e ? _(t[n], 4) && a.push(t[n]) : 'move' == e && (_(t[n], 4) || a.push(t[n]))
      return a
    }
    function _(t, e) {
      for (var a = t.charAt(0), n = !1, i = 0; i < t.length; i++) {
        a = t.charAt(i)
        if (X(t, a) >= e && 'X' != a) {
          n = !0
          break
        }
      }
      return n
    }
    function j(t) {
      var e = [],
        a = ''
      if (4 == t.length) {
        for (var n = y(t), i = {}, l = 0; l < n.length; l++) i[l] = '单' == n[l] ? '13579' : '双' == n[l] ? '02468' : ''
        for (l = 0; l < i[0].length; l++)
          for (var r = i[0], o = 0; o < i[1].length; o++)
            for (var s = i[1], u = 0; u < i[2].length; u++)
              for (var p = i[2], d = 0; d < i[3].length; d++) {
                var c = i[3]
                a += '##' + [r[l], s[o], p[u], c[d]].join('')
              }
        '##' != a && (e = a.replace('##', '').split('##'))
      }
      return e
    }
    function T(t) {
      for (var e = y(t), a = '', n = 0; n < e.length; n++) a.indexOf(e[n]) < 0 && (a += e[n])
      return (2 == a.length && a.indexOf('单') >= 0 && a.indexOf('双') >= 0) || (1 == a.length && ('单' == a || '双' == a))
    }
    ;((Array.prototype.intersectArr = function (t) {
      var e = [],
        a = '',
        n = t.join('##')
      for (i = 0; i < this.length; i++) n.indexOf(this[i]) >= 0 && (a += '##' + this[i])
      return ('' != a && '##' != a && (e = a.replace('##', '').split('##')), e)
    }),
      t('translateRule', {
        proTrateNum: function (t) {
          var a = ''
          if ('' == t || 0 == t.length) return []
          var n = (function (t) {
              var e = [],
                a = !1,
                n = t.replace(/各/g, '=')
              if (n.indexOf('=') >= 0)
                for (var i = X(n, '='), l = 0; l < i; l++) {
                  var r,
                    o = n.indexOf('='),
                    s = n.indexOf(';', o)
                  s < 0 && (s = n.indexOf('#', o))
                  var u = ''
                  if (s < 0) {
                    if (((r = n.substring(o + 1)), isNaN(r) && ((u = r.replace(/[0-9]/gi, '')), (r = r.replace(/[^0-9]/gi, ''))), '' == r || isNaN(r))) {
                      a = !0
                      break
                    }
                  } else r = (r = n.substring(o + 1, s)).replace(/[^0-9.]/gi, '')
                  if ((((p = {}).str = '' == u ? n.substring(0, o) : n.substring(0, o) + u), (p.money = r), e.push(p), (n = n.substring(s + 1)), l == i - 1 && '' != n && n.indexOf('=') < 0)) {
                    a = !0
                    break
                  }
                }
              else {
                var p
                ;(((p = {}).str = t), e.push(p))
              }
              a && (e = [])
              return e
            })(t.replace(/[,，]/g, ';').replace(/\r/g, ';').replace(/[+]/gi, 'X').toUpperCase().replace(/[走]/g, '跑').replace(/[位]/g, '')),
            i = []
          t: for (var l = 0; l < n.length; l++)
            for (var r = n[l].str.split(';'), o = n[l].money, s = 0; s < r.length; s++) {
              var u = e(r[s])
              if (u.msg && 'fail' == u.msg) {
                a = 'fail'
                break t
              }
              var p = {}
              ;((p.list = u.list), (p.money = o), i.push(p))
            }
          var d = {}
          return ('fail' == a && ((i = []), (d.msg = 'fail')), (d.list = i), d)
        }
      }))
  }),
  layui.define(function (t) {
    var e
    function a(t, e) {
      var a = []
      if (2 == e) {
        var i = t.peiOne,
          o = []
        ;((s = t.peiTwo) && o.push(s), i && o.push(i), 1 == o.length ? (a = n(e, o)) : 2 == o.length && (a = l(e, o)))
      } else if (3 == e) {
        i = t.peiOne
        var s = t.peiTwo,
          u = t.peiThr
        o = []
        ;(s && o.push(s), i && o.push(i), u && o.push(u), 1 == o.length ? (a = n(e, o)) : 2 == o.length ? (a = l(e, o)) : 3 == o.length && (a = r(e, o)))
      } else if (4 == e) {
        var p = t.peiOne,
          d = t.peiTwo,
          c = t.peiThr,
          f = t.peiFour
        o = []
        if ((p && (o.push(p), (p = X(p))), d && (o.push(d), (d = X(d))), c && (o.push(c), (c = X(c))), f && (o.push(f), (f = X(f))), 1 == o.length)) a = n(e, o)
        else if (2 == o.length) a = l(e, o)
        else if (3 == o.length) a = r(e, o)
        else {
          for (var h = '', m = ['XOOOO', 'OXOOO', 'OOXOO', 'OOOXO', 'OOOOX'], y = 0; y < m.length; y++)
            for (var g = 0; g < p.length; g++)
              for (var b = 0; b < d.length; b++)
                for (var v = 0; v < c.length; v++)
                  for (var O = 0; O < f.length; O++) {
                    var k = [p[g], d[b], c[v], f[O]]
                    for (y = 0; y < k.length; y++)
                      for (var w = 0; w < k.length; w++)
                        for (var M = 0; M < k.length; M++)
                          for (var _ = 0; _ < k.length; _++)
                            if (w != M && M != _ && w != _ && y != M && y != w && y != _) {
                              var j = m[y].replace('O', k[y])
                              h += '##' + (j = (j = (j = j.replace('O', k[w])).replace('O', k[M])).replace('O', k[_]))
                            }
                  }
          ;('' != h && '##' != h && (a = h.replace('##', '').split('##')), (a = x(a)))
        }
      } else {
        ;((i = t.peiOne), (s = t.peiTwo))
        var T = ['OXXXO', 'XXXOO']
        h = ''
        if ((null == i && null != s) || (null != i && null == s)) {
          var N = X(null != i ? i : s)
          for (O = 0; O < T.length; O++)
            for (g = 0; g < N.length; g++)
              for (b = 0; b <= 9; b++) {
                ;((h += '##' + T[O].replace('O', N[g]).replace('O', b)), (h += '##' + T[O].replace('O', b).replace('O', N[g])))
              }
        } else if (null != i && null != s)
          for (p = X(i), d = X(s), O = 0; O < T.length; O++)
            for (g = 0; g < p.length; g++)
              for (b = 0; b < d.length; b++) {
                ;((h += '##' + T[O].replace('O', p[g]).replace('O', d[b])), (h += '##' + T[O].replace('O', d[b]).replace('O', p[g])))
              }
        ;('' != h && '##' != h && (a = h.replace('##', '').split('##')), (a = x(a)))
      }
      return a
    }
    function n(t, e) {
      var a = [],
        n = e[0],
        i = ''
      if (2 == t) {
        for (var l = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO'], r = 0; r < l.length; r++)
          for (var o = 0; o < 10; o++)
            for (var s = 0; s < 10; s++)
              if (n.indexOf(o) >= 0 || n.indexOf(s) >= 0) {
                var u = l[r]
                i += '##' + (u = (u = u.replace('O', o)).replace('O', s))
                var p = l[r]
                i += '##' + (p = (p = p.replace('O', s)).replace('O', o))
              }
      } else if (3 == t) {
        for (l = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], r = 0; r < l.length; r++)
          for (o = 0; o < 10; o++)
            for (s = 0; s < 10; s++)
              for (var d = 0; d < 10; d++)
                if (n.indexOf(o) > 0 || n.indexOf(s) >= 0 || n.indexOf(d) >= 0)
                  for (var c = [o, s, d], f = 0; f < c.length; f++) for (var h = 0; h < c.length; h++) for (var m = 0; m < c.length; m++) f != h && h != m && f != m && (i += '##' + (u = (u = (u = l[r].replace('O', c[f])).replace('O', c[h])).replace('O', c[m])))
      } else if (4 == t) {
        var y = ['XOOOO', 'OXOOO', 'OOXOO', 'OOOXO', 'OOOOX']
        for (d = 0; m < y.length; d++)
          for (r = 0; r < 10; r++)
            for (o = 0; o < 10; o++)
              for (s = 0; s < 10; s++)
                for (d = 0; d < 10; d++)
                  if (n.indexOf(o) > 0 || n.indexOf(s) >= 0 || n.indexOf(d) >= 0 || n.indexOf(r) >= 0) {
                    c = [r, o, s, d]
                    for (var g = 0; g < c.length; g++)
                      for (f = 0; f < c.length; f++)
                        for (h = 0; h < c.length; h++)
                          for (m = 0; m < c.length; m++)
                            if (f != h && h != m && f != m && g != h && g != f && g != m) {
                              var b = y[d]
                              i += '##' + (b = (b = (b = (b = b.replace('O', c[g])).replace('O', c[f])).replace('O', c[h])).replace('O', c[m]))
                            }
                  }
      }
      return ('' != i && '##' != i && (a = i.replace('##', '').split('##')), (a = x(a)))
    }
    function l(t, e) {
      var a = [],
        n = e[0],
        i = e[1],
        l = X(n),
        r = X(i),
        o = ''
      if (2 == t)
        for (var s = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO'], u = X(n + i), p = 0; p < s.length; p++)
          for (var d = 0; d < l.length; d++)
            for (var c = 0; c < r.length; c++) {
              ;((o += '##' + s[p].replace('O', l[d]).replace('O', r[c])), (o += '##' + s[p].replace('O', r[c]).replace('O', l[d])))
            }
      if (3 == t) {
        for (s = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], u = X(n + i), p = 0; p < s.length; p++)
          for (var f = 0; f < 10; f++)
            for (d = 0; d < u.length; d++)
              for (c = 0; c < u.length; c++)
                if (d != c && ((n.indexOf(u[d]) >= 0 && i.indexOf(u[d]) >= 0) || (n.indexOf(u[c]) >= 0 && i.indexOf(u[d]) >= 0)))
                  for (var h = [f, u[d], u[c]], m = 0; m < h.length; m++) for (var y = 0; y < h.length; y++) for (var g = 0; g < h.length; g++) m != y && y != g && m != g && (o += '##' + s[p].replace('O', h[m]).replace('O', h[y]).replace('O', h[g]))
      } else if (4 == t)
        for (d = 0; d < 10; d++)
          for (c = 0; c < 10; c++)
            for (m = 0; m < l.length; m++)
              for (p = 0; p < r.length; p++)
                for (h = [d, c, l[m], r[p]], f = 0; f < h.length; f++)
                  for (y = 0; y < h.length; y++)
                    for (g = 0; g < h.length; g++)
                      for (var b = 0; b < h.length; b++) {
                        if (f != y && y != g && f != g && b != g && b != y && b != f) o += '##' + [h[f], h[y], h[g], h[b]].join('')
                      }
      return ('' != o && '##' != o && (a = o.replace('##', '').split('##')), (a = x(a)))
    }
    function r(t, e) {
      var a = [],
        n = e[0],
        i = e[1],
        l = e[2],
        r = ''
      if (3 == t) {
        for (var o = X(n), s = X(i), u = X(l), p = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], d = 0; d < o.length; d++)
          for (var c = 0; c < s.length; c++)
            for (var f = 0; f < u.length; f++)
              for (var h = [o[d], s[c], u[f]], m = 0; m < h.length; m++)
                for (var y = 0; y < h.length; y++)
                  for (var g = 0; g < h.length; g++)
                    if (m != y && g != y && m != g)
                      for (var b = 0; b < p.length; b++) {
                        r += '##' + p[b].replace('O', h[y]).replace('O', h[g]).replace('O', h[m])
                      }
      } else if (4 == t)
        for (o = X(n), s = X(i), u = X(l), b = 0; b < 10; b++)
          for (d = 0; d < o.length; d++)
            for (c = 0; c < s.length; c++)
              for (f = 0; f < u.length; f++)
                for (h = [b, o[d], s[c], u[f]], m = 0; m < h.length; m++)
                  for (g = 0; g < h.length; g++)
                    for (y = 0; y < h.length; y++)
                      for (var v = 0; v < h.length; v++) {
                        if (v != g && g != y && v != y && m != y && v != m && g != m) r += '##' + [h[m], h[g], h[y], h[v]].join('')
                      }
      return ('' != r && '##' != r && (a = r.replace('##', '').split('##')), (a = x(a)))
    }
    function o(t, e) {
      var a = [],
        n = ''
      if (2 == e)
        for (var i = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO'], l = 0; l < i.length; l++)
          for (var r = 0; r <= 9; r++)
            for (var o = 0; o <= 9; o++) {
              if (t.indexOf(r) < 0 && t.indexOf(o) < 0) n += '##' + i[l].replace('O', r).replace('O', o)
            }
      else if (3 == e)
        for (i = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], l = 0; l < i.length; l++)
          for (r = 0; r <= 9; r++)
            for (o = 0; o <= 9; o++)
              for (var s = 0; s <= 9; s++) {
                if (t.indexOf(r) < 0 && t.indexOf(o) < 0 && t.indexOf(s) < 0) n += '##' + i[l].replace('O', r).replace('O', o).replace('O', s)
              }
      else if (4 == e) {
        i = ['OOOOX', 'OOOXO', 'OOXOO', 'OXOOO', 'XOOOO']
        for (var u = 0; u < i.length; u++)
          for (l = 0; l <= 9; l++)
            for (o = 0; o <= 9; o++)
              for (r = 0; r <= 9; r++)
                for (s = 0; s <= 9; s++)
                  if (t.indexOf(l) < 0 && t.indexOf(o) < 0 && t.indexOf(r) < 0 && t.indexOf(s) < 0) {
                    var p = i[u]
                    n += '##' + (p = (p = (p = (p = p.replace('O', l)).replace('O', o)).replace('O', s)).replace('O', r))
                  }
      } else
        for (i = ['OXXXO', 'XXXOO'], l = 0; l < i.length; l++)
          for (r = 0; r <= 9; r++)
            for (o = 0; o <= 9; o++) {
              if (t.indexOf(r) < 0 && t.indexOf(o) < 0) n += '##' + i[l].replace('O', r).replace('O', o)
            }
      return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), x(a))
    }
    function s(t, e, a, n) {
      if (n.length > 0) {
        var i = '',
          l = []
        if (2 == a) {
          for (var r = 0; r < n.length; r++)
            for (var o = X(n[r].replace(/[^0-9]/g, '')), s = 0; s < o.length; s++)
              for (var u = 0; u < o.length; u++)
                if (s != u) {
                  var p = X(1 * o[s] + 1 * o[u] + '')
                  t.ipt.indexOf(p[p.length - 1]) >= 0 && i.indexOf(n[r]) < 0 && (i += '##' + n[r])
                }
          i = i.replace('##', '').split('##')
        } else if (3 == a) {
          for (r = 0; r < n.length; r++)
            for (o = X(n[r].replace(/[^0-9]/g, '')), s = 0; s < o.length; s++)
              for (u = s + 1; u < o.length; u++)
                for (var d = u + 1; d < o.length; d++) {
                  p = X(1 * o[s] + 1 * o[u] + 1 * o[d] + '')
                  t.ipt.indexOf(p[p.length - 1]) >= 0 && i.indexOf(n[r]) < 0 && (i += '##' + n[r])
                }
          i = i.replace('##', '').split('##')
        }
        if (4 == e) {
          var c = t.min,
            f = t.max,
            h = ''
          if (null != c && null != f && '' != c && '' != f) {
            i.length < 1 && (i = n)
            for (r = 0; r < i.length; r++) {
              ;(O = 1 * (o = X(i[r]))[0] + 1 * o[1] + 1 * o[2] + 1 * o[3]) >= c && O <= f && l.push(i[r])
            }
          } else l = i
        } else l = i
        return l
      }
      var m = [],
        y = ''
      if (null == t) return m
      if (2 == e) {
        var g = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO']
        for (u = 0; u < g.length; u++)
          for (r = 0; r <= 9; r++)
            for (s = 0; s <= 9; s++) {
              var b = (F = X(r + s + ''))[F.length - 1]
              if (t.ipt.indexOf(b) >= 0) y += '##' + g[u].replace('O', r).replace('O', s)
            }
        '' != y && '##' != y && (m = y.replace('##', '').split('##'))
      } else if (3 == e) {
        g = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO']
        if (2 == a)
          for (var v = 0; v < g.length; v++)
            for (u = 0; u <= 9; u++)
              for (r = 0; r <= 9; r++)
                for (s = 0; s <= 9; s++) {
                  var O = (C = X(r + s + ''))[C.length - 1],
                    k = ($ = X(r + u + ''))[$.length - 1],
                    w = (K = X(u + s + ''))[K.length - 1]
                  if (t.ipt.indexOf(O) >= 0 || t.ipt.indexOf(k) >= 0 || t.ipt.indexOf(w) >= 0) y += '##' + g[v].replace('O', u).replace('O', r).replace('O', s)
                }
        else if (3 == a)
          for (v = 0; v < g.length; v++)
            for (u = 0; u <= 9; u++)
              for (r = 0; r <= 9; r++)
                for (s = 0; s <= 9; s++) {
                  b = (F = X(r + s + u + ''))[F.length - 1]
                  if (t.ipt.indexOf(b) >= 0) y += '##' + g[v].replace('O', u).replace('O', r).replace('O', s)
                }
        '' != y && '##' != y && (m = y.replace('##', '').split('##'))
      } else if (4 == e) {
        g = ['XOOOO', 'OXOOO', 'OOXOO', 'OOOXO', 'OOOOX']
        var M = []
        if (2 == a)
          for (var _ = 0; _ < g.length; _++)
            for (v = 0; v <= 9; v++)
              for (u = 0; u <= 9; u++)
                for (r = 0; r <= 9; r++)
                  for (s = 0; s <= 9; s++) {
                    ;((O = (C = X(r + s + ''))[C.length - 1]), (k = ($ = X(r + v + ''))[$.length - 1]), (w = (K = X(r + u + ''))[K.length - 1]))
                    var j = (L = X(v + s + ''))[L.length - 1],
                      T = X(v + u + ''),
                      N = T[T.length - 1],
                      S = X(u + s + ''),
                      A = S[S.length - 1]
                    if (t.ipt.indexOf(O) >= 0 || t.ipt.indexOf(k) >= 0 || t.ipt.indexOf(w) >= 0 || t.ipt.indexOf(j) >= 0 || t.ipt.indexOf(N) >= 0 || t.ipt.indexOf(A) >= 0) y += '##' + g[_].replace('O', v).replace('O', u).replace('O', r).replace('O', s)
                  }
        else if (3 == a)
          for (_ = 0; _ < g.length; _++)
            for (v = 0; v <= 9; v++)
              for (u = 0; u <= 9; u++)
                for (r = 0; r <= 9; r++)
                  for (s = 0; s <= 9; s++) {
                    var C, $, K, L
                    ;((O = (C = X(r + s + u + ''))[C.length - 1]), (k = ($ = X(r + s + v + ''))[$.length - 1]), (w = (K = X(v + s + u + ''))[K.length - 1]), (j = (L = X(r + v + u + ''))[L.length - 1]))
                    if (t.ipt.indexOf(O) >= 0 || t.ipt.indexOf(k) >= 0 || t.ipt.indexOf(w) >= 0 || t.ipt.indexOf(j) >= 0) y += '##' + g[_].replace('O', v).replace('O', u).replace('O', r).replace('O', s)
                  }
        var D = []
        ;((c = t.min), (f = t.max), (h = ''))
        if (('' != c && null != c) || ('' != f && null != f))
          for (_ = 0; _ < g.length; _++)
            for (v = 0; v <= 9; v++)
              for (u = 0; u <= 9; u++)
                for (r = 0; r <= 9; r++)
                  for (s = 0; s <= 9; s++) {
                    if ((O = r + s + u + v) >= c && O <= f) h += '##' + g[_].replace('O', v).replace('O', u).replace('O', r).replace('O', s)
                  }
        ;('' != h && '##' != h && (M = h.replace('##', '').split('##')), '' != y && '##' != y && (D = y.replace('##', '').split('##')), (m = null != c && null != f && '' != c && '' != f && null != a && '' != a ? M.intersectD(D) : null == c || null == f || '' == c || '' == f ? D : M))
      } else {
        g = ['OXXXO', 'XXXOO']
        y = ''
        for (u = 0; u < g.length; u++)
          for (r = 0; r <= 9; r++)
            for (s = 0; s <= 9; s++) {
              var F
              b = (F = X(r + s + ''))[F.length - 1]
              if (t.ipt.indexOf(b) >= 0) y += '##' + g[u].replace('O', r).replace('O', s)
            }
        '' != y && '##' != y && (m = y.replace('##', '').split('##'))
      }
      return (m = x(m))
    }
    function u(t, e, a, n, i) {
      var l = X(t),
        r = [],
        o = ''
      if (2 == a && l.length < e) {
        if (2 == e) {
          var s = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO']
          if (i && 1 == i.length) {
            if ('get' == n)
              for (var u = X(i[0].data), p = 0; p < s.length; p++) {
                if ('X' != (R = X(s[p]))[i[0].position])
                  for (var d = 0; d < u.length; d++) {
                    R[i[0].position] = u[d]
                    for (var c = X(t), f = 0; f < c.length; f++) {
                      o += '##' + (b = (b = R.join('')).replace('O', c[f]))
                    }
                  }
              }
            else if ('move' == n)
              for (u = X(i[0].data), p = 0; p < s.length; p++) {
                if ('X' != (R = X(s[p]))[i[0].position])
                  for (d = 0; d <= 9; d++)
                    if (i[0].data.indexOf(d) < 0) {
                      R[i[0].position] = d
                      for (f = 0; f <= 9; f++) {
                        if (t.indexOf(f) < 0) o += '##' + (b = (b = R.join('')).replace('O', f))
                      }
                    }
              }
          } else if (i && 2 == i.length);
          else
            for (d = 0; d < s.length; d++)
              for (var h = X(s[d]), m = 0; m < h.length; m++)
                if ('O' == h[m])
                  for (var y = 0; y <= 9; y++) {
                    ;(((E = X(s[d]))[m] = t), (o += '##' + E.join('').replace('O', y)))
                  }
        } else if (3 == e) {
          s = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO']
          if (i && 1 == i.length) {
            if ('get' == n)
              for (u = X(i[0].data), p = 0; p < s.length; p++) {
                if ('X' != (R = X(s[p]))[i[0].position])
                  for (d = 0; d < u.length; d++) {
                    R[i[0].position] = u[d]
                    for (c = X(t), y = 0; y < c.length; y++)
                      if (1 != c.length)
                        for (f = 0; f < c.length; f++) {
                          if (y != f) o += '##' + (b = (b = (b = R.join('')).replace('O', c[y])).replace('O', c[f]))
                        }
                      else
                        for (f = 0; f <= 9; f++) {
                          o += '##' + (b = (b = (b = R.join('')).replace('O', c[y])).replace('O', f))
                          var g = R.join('')
                          o += '##' + (g = (g = g.replace('O', f)).replace('O', c[y]))
                        }
                  }
              }
            else if ('move' == n)
              for (u = X(i[0].data), p = 0; p < s.length; p++) {
                if ('X' != (R = X(s[p]))[i[0].position])
                  for (d = 0; d <= 9; d++)
                    if (i[0].data.indexOf(d) < 0) {
                      R[i[0].position] = u[d]
                      var b = R.join('')
                      for (f = 0; f <= 9; f++) {
                        var v = b.replace('O', f)
                        for (y = 0; y <= 9; y++) {
                          var O = v.replace('O', y)
                          1 == t.length ? t.indexOf(f) >= 0 || t.indexOf(y) >= 0 || (o += '##' + O) : 2 == t.length && ((t.indexOf(f) >= 0 && t.indexOf(y) >= 0 && y != f) || (o += '##' + O))
                        }
                      }
                    }
              }
          } else if (i && 2 == i.length) {
            if ('get' == n) {
              var k = X(i[0].data),
                w = X(i[1].data)
              for (p = 0; p < s.length; p++) {
                if ('X' != (R = X(s[p]))[i[0].position] && 'X' != R[i[1].position])
                  for (d = 0; d < k.length; d++) {
                    R[i[0].position] = k[d]
                    for (f = 0; f < w.length; f++) {
                      R[i[1].position] = w[f]
                      for (c = X(t), y = 0; y < c.length; y++) {
                        o += '##' + (b = (b = R.join('')).replace('O', c[y]))
                      }
                    }
                  }
              }
            } else if ('move' == n)
              for (k = X(i[0].data), w = X(i[1].data), p = 0; p < s.length; p++) {
                if ('X' != (R = X(s[p]))[i[0].position] && 'X' != R[i[1].position])
                  for (d = 0; d <= 9; d++)
                    for (v = (b = s[p]).replace('O', d), y = 0; y <= 9; y++)
                      for (O = v.replace('O', y), f = 0; f <= 9; f++) {
                        var _ = O.replace('O', f)
                        t.indexOf(f) < 0 && (o += '##' + _)
                      }
              }
          } else if (i && 3 == i.length);
          else if (1 == t.length)
            for (d = 0; d < s.length; d++)
              for (X(s[d]), p = 0; p <= 9; p++)
                for (y = 0; y <= 9; y++)
                  for (f = 0; f <= 9; f++) {
                    ;((j = (j = (j = s[d].replace('O', p)).replace('O', y)).replace('O', f)), (t.indexOf(p) >= 0 || t.indexOf(f) >= 0 || t.indexOf(y) >= 0) && (o += '##' + j))
                  }
          else
            for (d = 0; d < s.length; d++)
              for (p = 0; p <= 9; p++)
                for (y = 0; y <= 9; y++)
                  for (f = 0; f <= 9; f++) {
                    var j,
                      T = X(t).sort().join(''),
                      N = M(T, [p, y].sort().join('')),
                      S = M(T, [p, f].sort().join('')),
                      A = M(T, [y, f].sort().join(''))
                    if (N > 0 || S > 0 || A > 0) o += '##' + (j = (j = (j = s[d].replace('O', p)).replace('O', y)).replace('O', f))
                  }
        } else if (4 == e) {
          var C = ['OOOOX', 'OOOXO', 'OOXOO', 'OXOOO', 'XOOOO']
          if (i && 1 == i.length) {
            if ('get' == n) {
              k = X(i[0].data)
              for (var $ = 0; $ < C.length; $++)
                for (p = 0; p < k.length; p++) {
                  ;(R = X(C[$]))[i[0].position] = k[p]
                  b = R.join('')
                  if (1 == t.length)
                    for (d = 0; d <= 9; d++)
                      for (v = b.replace('O', d), f = 0; f <= 9; f++)
                        for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                          if (t.indexOf(d) >= 0 || t.indexOf(f) >= 0 || t.indexOf(y) >= 0) o += '##' + O.replace('O', y)
                        }
                  else if (2 == t.length)
                    for (d = 0; d <= 9; d++)
                      for (v = b.replace('O', d), f = 0; f <= 9; f++)
                        for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                          if ((t.indexOf(d) >= 0 && t.indexOf(f) >= 0 && d != f) || (t.indexOf(f) >= 0 && t.indexOf(y) >= 0 && y != f) || (t.indexOf(y) >= 0 && t.indexOf(d) >= 0 && d != y)) o += '##' + O.replace('O', y)
                        }
                  else if (3 == t.length)
                    for (d = 0; d <= 9; d++)
                      for (v = b.replace('O', d), f = 0; f <= 9; f++)
                        for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                          if (t.indexOf(d) >= 0 && t.indexOf(f) >= 0 && t.indexOf(y) >= 0 && d != f && f != y && d != y) o += '##' + O.replace('O', y)
                        }
                }
            } else if ('move' == n)
              for (p = 0; p <= 9; p++)
                if (i[0].data.indexOf(p) < 0)
                  for ($ = 0; $ < C.length; $++) {
                    ;(R = X(C[$]))[i[0].position] = p
                    b = R.join('')
                    if (1 == t.length)
                      for (d = 0; d <= 9; d++)
                        for (v = b.replace('O', d), f = 0; f <= 9; f++)
                          for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                            if (t.indexOf(d) < 0 && t.indexOf(f) < 0 && t.indexOf(y) < 0) o += '##' + O.replace('O', y)
                          }
                    else if (2 == t.length)
                      for (d = 0; d <= 9; d++)
                        for (v = b.replace('O', d), f = 0; f <= 9; f++)
                          for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                            if ((t.indexOf(d) >= 0 && t.indexOf(f) >= 0 && f != d) || (t.indexOf(d) >= 0 && t.indexOf(y) >= 0 && d != y) || (t.indexOf(y) >= 0 && t.indexOf(f) >= 0 && y != f));
                            else o += '##' + O.replace('O', y)
                          }
                    else
                      for (d = 0; d <= 9; d++)
                        for (v = b.replace('O', d), f = 0; f <= 9; f++)
                          for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                            if (!(t.indexOf(d) >= 0 && t.indexOf(f) >= 0 && t.indexOf(y) >= 0 && f != d && d != y && f != y)) o += '##' + O.replace('O', y)
                          }
                  }
          } else if (i && 2 == i.length) {
            if ('get' == n) {
              ;((k = X(i[0].data)), (w = X(i[1].data)))
              var K = X(t)
              for (p = 0; p < k.length; p++)
                for ($ = 0; $ < C.length; $++) {
                  ;(R = X(C[$]))[i[0].position] = k[p]
                  for (d = 0; d < w.length; d++) {
                    R[i[1].position] = w[d]
                    for (b = R.join(''), f = 0; f < K.length; f++)
                      if (1 == K.length)
                        for (y = 0; y <= 9; y++) {
                          ;((o += '##' + (v = b.replace('O', K[f])).replace('O', y)), (o += '##' + (v = b.replace('O', y)).replace('O', K[f])))
                        }
                      else
                        for (y = 0; y < K.length; y++) {
                          if (y != f) o += '##' + (v = b.replace('O', K[f])).replace('O', K[y])
                        }
                  }
                }
            } else if ('move' == n)
              if (1 == t.length) {
                for ($ = 0; $ < C.length; $++)
                  for (p = 0; p <= 9; p++)
                    for (d = 0; d <= 9; d++)
                      if (!(i[0].data.indexOf(p) >= 0 && i[1].data.indexOf(d) >= 0)) {
                        ;(((R = X(C[$]))[i[0].position] = p), (R[i[1].position] = d))
                        for (v = R.join(''), f = 0; f <= 9; f++)
                          for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                            _ = O.replace('O', y)
                            t.indexOf(f) >= 0 || t.indexOf(y) >= 0 || (o += '##' + _)
                          }
                      }
              } else if (t.length > 1)
                for ($ = 0; $ < C.length; $++)
                  for (p = 0; p <= 9; p++)
                    for (d = 0; d <= 9; d++)
                      if (!(i[0].data.indexOf(p) >= 0 && i[1].data.indexOf(d) >= 0)) {
                        ;(((R = X(C[$]))[i[0].position] = p), (R[i[1].position] = d))
                        for (v = R.join(''), f = 0; f <= 9; f++)
                          for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                            _ = O.replace('O', y)
                            ;(t.indexOf(f) >= 0 && t.indexOf(y) >= 0 && f != y) || (o += '##' + _)
                          }
                      }
          } else if (i && 3 == i.length) {
            if ('get' == n) {
              ;((k = X(i[0].data)), (w = X(i[1].data)))
              var L = X(i[2].data)
              for (K = X(t), $ = 0; $ < C.length; $++)
                for (p = 0; p < k.length; p++) {
                  ;(R = X(C[$]))[i[0].position] = k[p]
                  for (d = 0; d < w.length; d++) {
                    R[i[1].position] = w[d]
                    for (f = 0; f < L.length; f++) {
                      R[i[2].position] = L[f]
                      for (b = R.join(''), y = 0; y < K.length; y++) {
                        o += '##' + b.replace('O', K[y])
                      }
                    }
                  }
                }
            } else
              for (k = X(i[0].data), w = X(i[1].data), L = X(i[2].data), K = X(t), $ = 0; $ < C.length; $++)
                for (p = 0; p <= 9; p++)
                  for (d = 0; d <= 9; d++)
                    for (f = 0; f <= 9; f++)
                      if (!(i[0].data.indexOf(p) >= 0 && i[1].data.indexOf(d) >= 0 && i[2].data.indexOf(f) >= 0)) {
                        ;(((R = X(C[$]))[i[0].position] = p), (R[i[1].position] = d), (R[i[2].position] = f))
                        for (b = R.join(''), y = 0; y <= 9; y++) {
                          if (t.indexOf(y) < 0) o += '##' + b.replace('O', y)
                        }
                      }
          } else if (i && 4 == i.length) {
            ;((k = X(i[0].data)), (w = X(i[1].data)), (L = X(i[2].data)))
            var D = X(i[3].data)
          } else if (1 == t.length)
            for ($ = 0; $ < C.length; $++)
              for (d = 0; d <= 9; d++)
                for (y = 0; y <= 9; y++)
                  for (f = 0; f <= 9; f++)
                    for (var F = 0; F <= 9; F++) {
                      if (t.indexOf(y) >= 0 || t.indexOf(d) >= 0 || t.indexOf(f) >= 0 || t.indexOf(F) >= 0) o += '##' + C[$].replace('O', d).replace('O', y).replace('O', f).replace('O', F)
                    }
          else if (2 == t.length)
            for ($ = 0; $ < C.length; $++)
              for (d = 0; d <= 9; d++)
                for (y = 0; y <= 9; y++)
                  for (f = 0; f <= 9; f++)
                    for (F = 0; F <= 9; F++) {
                      ;((N = M((s = X(t).sort().join('')), [d, y].sort().join(''))), (S = M(s, [d, f].sort().join(''))), (A = M(s, [d, F].sort().join(''))))
                      var I = M(s, [f, F].sort().join('')),
                        q = M(s, [f, y].sort().join('')),
                        B = M(s, [y, F].sort().join(''))
                      if (N > 0 || A > 0 || I > 0 || S > 0 || q > 0 || B > 0) o += '##' + C[$].replace('O', d).replace('O', y).replace('O', f).replace('O', F)
                    }
          else if (3 == t.length)
            for ($ = 0; $ < C.length; $++)
              for (d = 0; d <= 9; d++)
                for (y = 0; y <= 9; y++)
                  for (f = 0; f <= 9; f++)
                    for (F = 0; F <= 9; F++) {
                      ;((N = M((s = X(t).sort().join('')), [d, y, f].sort().join(''))), (S = M(s, [d, y, F].sort().join(''))), (A = M(s, [d, f, F].sort().join(''))), (I = M(s, [y, f, F].sort().join(''))))
                      if (N > 0 || S > 0 || A > 0 || I > 0) o += '##' + C[$].replace('O', d).replace('O', y).replace('O', f).replace('O', F)
                    }
        } else if (5 == e) {
          s = ['OXXXO', 'XXXOO']
          if (1 == l.length)
            for (d = 0; d < s.length; d++)
              for (h = X(s[d]), y = 0; y <= 9; y++) {
                ;((o += '##' + (E = s[d]).replace('O', l[0]).replace('O', y)), (o += '##' + (E = s[d]).replace('O', y).replace('O', l[0])))
              }
          else
            for (d = 0; d < s.length; d++)
              for (h = X(s[d]), m = 0; m < l.length; m++)
                for (y = 0; y < l.length; y++) {
                  if (m != y) o += '##' + (E = s[d]).replace('O', l[m]).replace('O', l[y])
                }
        }
      } else if (2 == e) {
        s = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO']
        if (i && 1 == i.length) {
          if ('get' == n)
            for (u = X(i[0].data), p = 0; p < s.length; p++) {
              if ('X' != (R = X(s[p]))[i[0].position])
                for (d = 0; d < u.length; d++) {
                  R[i[0].position] = u[d]
                  for (c = X(t), f = 0; f < c.length; f++) {
                    o += '##' + (b = (b = R.join('')).replace('O', c[f]))
                  }
                }
            }
          else if ('move' == n)
            for (u = X(i[0].data), p = 0; p < s.length; p++) {
              if ('X' != (R = X(s[p]))[i[0].position])
                for (d = 0; d <= 9; d++)
                  if (i[0].data.indexOf(d) < 0) {
                    R[i[0].position] = d
                    for (f = 0; f <= 9; f++) {
                      o += '##' + (b = (b = R.join('')).replace('O', f))
                    }
                  }
            }
        } else if (i && 2 == i.length);
        else
          for (d = 0; d < s.length; d++) {
            var E = s[d]
            for (y = 0; y < l.length; y++) {
              U = (U = E).replace('O', l[y])
              for (f = 0; f < l.length; f++) {
                if (f != y) o += '##' + U.replace('O', l[f])
              }
            }
          }
      } else if (3 == e) {
        s = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO']
        if (i && 1 == i.length) {
          if ('get' == n)
            for (u = X(i[0].data), p = 0; p < s.length; p++) {
              if ('X' != (R = X(s[p]))[i[0].position])
                for (d = 0; d < u.length; d++) {
                  R[i[0].position] = u[d]
                  for (c = X(t), y = 0; y < c.length; y++)
                    for (f = 0; f < c.length; f++) {
                      if (y != f) o += '##' + (b = (b = (b = R.join('')).replace('O', c[y])).replace('O', c[f]))
                    }
                }
            }
          else if ('move' == n)
            for (u = X(i[0].data), p = 0; p < s.length; p++) {
              if ('X' != (R = X(s[p]))[i[0].position])
                for (d = 0; d <= 9; d++)
                  if (i[0].data.indexOf(d) < 0) {
                    R[i[0].position] = u[d]
                    for (b = R.join(''), f = 0; f <= 9; f++)
                      for (v = b.replace('O', f), y = 0; y <= 9; y++) {
                        o += '##' + (O = v.replace('O', y))
                      }
                  }
            }
        } else if (i && 2 == i.length) {
          if ('get' == n)
            for (k = X(i[0].data), w = X(i[1].data), p = 0; p < s.length; p++) {
              if ('X' != (R = X(s[p]))[i[0].position] && 'X' != R[i[1].position])
                for (d = 0; d < k.length; d++) {
                  R[i[0].position] = k[d]
                  for (f = 0; f < w.length; f++) {
                    R[i[1].position] = w[f]
                    for (c = X(t), y = 0; y < c.length; y++) {
                      o += '##' + (b = (b = R.join('')).replace('O', c[y]))
                    }
                  }
                }
            }
          else if ('move' == n)
            for (k = X(i[0].data), w = X(i[1].data), p = 0; p < s.length; p++) {
              if ('X' != (R = X(s[p]))[i[0].position] && 'X' != R[i[1].position])
                for (d = 0; d <= 9; d++)
                  for (v = (b = s[p]).replace('O', d), y = 0; y <= 9; y++)
                    for (O = v.replace('O', y), f = 0; f <= 9; f++) {
                      o += '##' + (_ = O.replace('O', f))
                    }
            }
        } else if (i && 3 == i.length);
        else
          for (d = 0; d < s.length; d++)
            for (y = 0; y < l.length; y++)
              for (f = 0; f < l.length; f++)
                for (F = 0; F < l.length; F++) {
                  if (F != y && y != f && f != F) o += '##' + s[d].replace('O', l[y]).replace('O', l[f]).replace('O', l[F])
                }
      } else if (4 == e) {
        C = ['OOOOX', 'OOOXO', 'OOXOO', 'OXOOO', 'XOOOO']
        if (i && 1 == i.length) {
          if ('get' == n)
            for (k = X(i[0].data), $ = 0; $ < C.length; $++)
              for (p = 0; p < k.length; p++) {
                var R = X(C[$]),
                  z = X(t)
                R[i[0].position] = k[p]
                for (b = R.join(''), d = 0; d < z.length; d++)
                  for (v = b.replace('O', z[d]), f = 0; f < z.length; f++)
                    for (O = v.replace('O', z[f]), y = 0; y < z.length; y++) {
                      if (d != f && f != y && d != y) o += '##' + O.replace('O', z[y])
                    }
              }
          else if ('move' == n)
            for ($ = 0; $ < C.length; $++)
              for (p = 0; p <= 9; p++)
                if (i[0].data.indexOf(p) < 0) {
                  ;(R = X(C[$]))[i[0].position] = p
                  for (b = R.join(''), d = 0; d <= 9; d++)
                    for (v = b.replace('O', d), f = 0; f <= 9; f++)
                      for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                        o += '##' + O.replace('O', y)
                      }
                }
        } else if (i && 2 == i.length) {
          if ('get' == n) {
            for (k = X(i[0].data), w = X(i[1].data), K = X(t), $ = 0; $ < C.length; $++)
              for (p = 0; p <= 9; p++)
                for (d = 0; d <= 9; d++)
                  if (i[0].data.indexOf(p) >= 0 && i[1].data.indexOf(d) >= 0) {
                    ;(((R = X(C[$]))[i[0].position] = p), (R[i[1].position] = d))
                    for (v = R.join(''), f = 0; f < K.length; f++)
                      for (O = v.replace('O', K[f]), y = 0; y < K.length; y++) {
                        if (y != f) o += '##' + O.replace('O', K[y])
                      }
                  }
          } else if ('move' == n)
            for (k = X(i[0].data), w = X(i[1].data), K = X(t), $ = 0; $ < C.length; $++)
              for (p = 0; p <= 9; p++)
                for (d = 0; d <= 9; d++)
                  if (!(i[0].data.indexOf(p) >= 0 && i[1].data.indexOf(d) >= 0)) {
                    ;(((R = X(C[$]))[i[0].position] = p), (R[i[1].position] = d))
                    for (v = R.join(''), f = 0; f <= 9; f++)
                      for (O = v.replace('O', f), y = 0; y <= 9; y++) {
                        o += '##' + O.replace('O', y)
                      }
                  }
        } else if (i && 3 == i.length) {
          if ('get' == n)
            for (k = X(i[0].data), w = X(i[1].data), L = X(i[2].data), K = X(t), $ = 0; $ < C.length; $++)
              for (p = 0; p < k.length; p++) {
                ;(R = X(C[$]))[i[0].position] = k[p]
                for (d = 0; d < w.length; d++) {
                  R[i[1].position] = w[d]
                  for (f = 0; f < L.length; f++) {
                    R[i[2].position] = L[f]
                    for (b = R.join(''), y = 0; y < K.length; y++) {
                      o += '##' + b.replace('O', K[y])
                    }
                  }
                }
              }
          else if ('move' == n)
            for (k = X(i[0].data), w = X(i[1].data), L = X(i[2].data), K = X(t), $ = 0; $ < C.length; $++)
              for (p = 0; p <= 9; p++)
                for (d = 0; d <= 9; d++)
                  for (f = 0; f <= 9; f++)
                    if (!(i[0].data.indexOf(p) >= 0 && i[1].data.indexOf(d) >= 0 && i[2].data.indexOf(f) >= 0)) {
                      ;(((R = X(C[$]))[i[0].position] = p), (R[i[1].position] = d), (R[i[2].position] = f))
                      for (b = R.join(''), y = 0; y <= 9; y++) {
                        o += '##' + b.replace('O', y)
                      }
                    }
        } else if (i && 4 == i.length)
          for (k = X(i[0].data), w = X(i[1].data), L = X(i[2].data), D = X(i[3].data), $ = 0; $ < C.length; $++)
            for (p = 0; p < k.length; p++) {
              ;(R = X(C[$]))[i[0].position] = k[p]
              for (d = 0; d < w.length; d++) {
                R[i[1].position] = w[d]
                for (f = 0; f < L.length; f++) {
                  R[i[2].position] = L[f]
                  for (b = R.join(''), y = 0; y < D.length; y++) {
                    o += '##' + b.replace('O', D[y])
                  }
                }
              }
            }
        else
          for ($ = 0; $ < C.length; $++)
            for (p = 0; p < l.length; p++)
              for (f = 0; f < l.length; f++)
                for (y = 0; y < l.length; y++)
                  for (d = 0; d < l.length; d++)
                    if (p != f && f != y && y != d && p != y && p != d && f != d) {
                      var P = C[$]
                      o += '##' + (P = (P = (P = (P = P.replace('O', l[p])).replace('O', l[f])).replace('O', l[y])).replace('O', l[d]))
                    }
      } else if (5 == e)
        for (s = ['OXXXO', 'XXXOO'], d = 0; d < s.length; d++)
          for (E = s[d], y = 0; y < l.length; y++) {
            var U
            U = (U = E).replace('O', l[y])
            for (f = 0; f < l.length; f++) {
              if (f != y) o += '##' + U.replace('O', l[f])
            }
          }
      return ('' != o && '##' != o && (r = o.replace('##', '').split('##')), x(r))
    }
    function p(t) {
      var e = [],
        a = ''
      if (2 == t) {
        for (var n = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO'], i = 0; i < n.length; i++)
          for (var l = 0; l <= 9; l++)
            for (var r = 0; r <= 9; r++) {
              a += '##' + n[i].replace('O', l).replace('O', r)
            }
        '' != a && '##' != a && (e = x((e = a.replace('##', '').split('##'))))
      } else if (3 == t) {
        for (n = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], i = 0; i < n.length; i++)
          for (l = 0; l <= 9; l++)
            for (r = 0; r <= 9; r++)
              for (var o = 0; o <= 9; o++) {
                a += '##' + n[i].replace('O', l).replace('O', r).replace('O', o)
              }
        '' != a && '##' != a && (e = x((e = a.replace('##', '').split('##'))))
      } else if (4 == t) {
        ;((a = ''), (n = ['OOOOX', 'OOOXO', 'OOXOO', 'OXOOO', 'XOOOO']))
        for (var s = 0; s < n.length; s++)
          for (i = 0; i <= 9; i++)
            for (l = 0; l <= 9; l++)
              for (o = 0; o <= 9; o++)
                for (r = 0; r <= 9; r++) {
                  var u = n[s]
                  a += '##' + (u = (u = (u = (u = u.replace('O', i)).replace('O', l)).replace('O', o)).replace('O', r))
                }
        e = a.replace('##', '').split('##')
      } else {
        var p = ['OXXXO', 'XXXOO']
        for (i = 0; i < p.length; i++)
          for (l = 0; l <= 9; l++)
            for (r = 0; r <= 9; r++) {
              a += '##' + p[i].replace('O', l).replace('O', r)
            }
        '' != a && '##' != a && (e = x((e = a.replace('##', '').split('##'))))
      }
      return e
    }
    function d(t, e) {
      var a = [],
        n = ''
      if (2 == e) {
        var i = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO']
        if (1 == t.length)
          for (var l = 0; l < i.length; l++)
            for (var r = 0; r <= 9; r++)
              for (var o = 0; o <= 9; o++) {
                var s = i[l]
                if (r == t[0] || o == t[0]) n += '##' + s.replace('O', o).replace('O', r)
              }
        else
          for (l = 0; l < i.length; l++)
            for (var u = 0; u < t.length; u++)
              for (r = 0; r < t.length; r++) {
                if (u != r) n += '##' + (s = i[l]).replace('O', t[u]).replace('O', t[r])
              }
      } else if (3 == e) {
        i = ['OOKXX', 'OKOXX', 'KOOXX', 'OOXKX', 'OKXOX', 'KOXOX', 'KXOOX', 'OXKOX', 'OXKOX', 'XKOOX', 'XOKOX', 'XOOKX', 'XXKOO', 'XXOKO', 'XXOOK', 'KXXOO', 'OXXKO', 'OXXOK', 'KOXXO', 'OKXXO', 'OOXXK', 'XKXOO', 'XOXKO', 'XOXOK', 'XKOXO', 'XOKXO', 'XOOXK', 'KXOXO', 'OXKXO', 'OXOXK']
        if (1 == t.length)
          for (l = 0; l < i.length; l++)
            for (r = 0; r <= 9; r++)
              for (o = 0; o <= 9; o++) {
                n += '##' + (s = i[l]).replace('O', r).replace('O', o).replace('K', t[0])
              }
        else
          for (l = 0; l < i.length; l++)
            for (u = 0; u < t.length; u++)
              for (r = 0; r < t.length; r++)
                for (o = 0; o <= 9; o++) {
                  if (u != r) n += '##' + (s = i[l]).replace('O', t[u]).replace('O', t[r]).replace('K', o)
                }
      } else if (4 == e) {
        i = ['OOOOX', 'OOOXO', 'OOXOO', 'OXOOO', 'XOOOO']
        if (1 == t.length)
          for (var p = 0; p < i.length; p++)
            for (u = 0; u < t.length; u++)
              for (r = 0; r <= 9; r++)
                for (o = 0; o <= 9; o++)
                  for (var d = 0; d <= 9; d++) {
                    ;((n += '##' + i[p].replace('O', t[u]).replace('O', r).replace('O', o).replace('O', d)),
                      (n += '##' + i[p].replace('O', r).replace('O', t[u]).replace('O', o).replace('O', d)),
                      (n += '##' + i[p].replace('O', r).replace('O', o).replace('O', t[u]).replace('O', d)),
                      (n += '##' + i[p].replace('O', r).replace('O', o).replace('O', d).replace('O', t[u])))
                  }
        else
          for (l = 0; l < i.length; l++)
            for (u = 0; u < t.length; u++)
              for (r = 0; r < t.length; r++)
                if (u != r)
                  for (o = 0; o <= 9; o++)
                    for (d = 0; d <= 9; d++) {
                      n += '##' + (s = i[l]).replace('O', t[u]).replace('O', t[r]).replace('O', o).replace('O', d)
                    }
      }
      return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
    }
    function c(t, a, n, i, l) {
      if (i.length > 0) {
        var r = '',
          o = []
        r = 'evens' == n ? '02468' : '13579'
        for (var s = 0; s < i.length; s++) {
          for (var u = X(i[s]), p = !0, d = 0; d < t.length; d++) r.indexOf(u[t[d]]) < 0 && (p = !1)
          'move' == l ? p || o.push(i[s]) : p && o.push(i[s])
        }
        return o
      }
      var c = [],
        f = ((r = []), '')
      if (((r = 'evens' == n ? ['0', '2', '4', '6', '8'] : ['1', '3', '5', '7', '9']), 2 == a)) {
        var h = X('XXXXX')
        for (s = 0; s < t.length; s++) h[t[s]] = 'K'
        var m = h.join('')
        if (1 == t.length) {
          var y = X(m),
            g = []
          for (s = 0; s < y.length; s++)
            if ('K' != y[s]) {
              var b = m.replacePos(m, s, 'O')
              g.push(b)
            }
          for (var v = 0; v < r.length; v++)
            for (s = 0; s < g.length; s++)
              for (var O = g[s].replace('K', r[v]), k = 0; k <= 9; k++) {
                f += '##' + (C = O.replace('O', k))
              }
        } else if (2 == t.length)
          for (v = 0; v < r.length; v++)
            for (var w = m.replace('K', r[v]), _ = 0; _ < r.length; _++) {
              f += '##' + ($ = ($ = w).replace('K', r[_]))
            }
      } else if (3 == a) {
        for (h = X('XXXXX'), s = 0; s < t.length; s++) h[t[s]] = 'K'
        m = h.join('')
        if (1 == t.length) {
          for (y = X(m), g = [], s = 0; s < y.length; s++)
            for (d = 0; d < y.length; d++) {
              if ('K' != y[s] && 'K' != y[d] && s != d) ((b = (b = m.replacePos(m, s, 'O')).replacePos(b, d, 'O')), g.push(b))
            }
          for (s = 0; s < r.length; s++)
            for (d = 0; d < g.length; d++)
              for (k = 0; k <= 9; k++)
                for (v = 0; v <= 9; v++) {
                  f += '##' + (b = (b = (b = g[d].replace('K', r[s])).replace('O', k)).replace('O', v))
                }
        } else if (2 == t.length) {
          for (y = X(m), g = [], s = 0; s < y.length; s++)
            if ('K' != y[s]) {
              b = m.replacePos(m, s, 'O')
              g.push(b)
            }
          for (d = 0; d < g.length; d++)
            for (s = 0; s < r.length; s++)
              for (v = 0; v < r.length; v++)
                for (k = 0; k <= 9; k++) {
                  f += '##' + (b = (b = (b = g[d].replace('K', r[s])).replace('K', r[v])).replace('O', k))
                }
        } else if (3 == t.length)
          for (v = 0; v < r.length; v++)
            for (w = m.replace('K', r[v]), _ = 0; _ < r.length; _++) {
              $ = ($ = w).replace('K', r[_])
              for (k = 0; k < r.length; k++) {
                var j = $
                f += '##' + (j = j.replace('K', r[k]))
              }
            }
      } else if (4 == a) {
        for (h = X('XXXXX'), s = 0; s < t.length; s++) h[t[s]] = 'K'
        for (y = X((m = h.join(''))), g = [], s = 0; s < y.length; s++)
          if ('K' != y[s]) {
            b = m.replacePos(m, s, 'O')
            g.push(b)
          }
        if (1 == t.length)
          for (var T = 0; T < g.length; T++)
            for (s = 0; s < r.length; s++)
              for (k = 0; k <= 9; k++)
                for (d = 0; d <= 9; d++)
                  for (v = 0; v <= 9; v++) {
                    f += '##' + g[T].replace('K', r[s]).replace('X', k).replace('X', d).replace('X', v).replace('O', 'X')
                  }
        else if (2 == t.length)
          for (T = 0; T < g.length; T++)
            for (s = 0; s < r.length; s++)
              for (v = 0; v < r.length; v++)
                for (d = 0; d <= 9; d++)
                  for (k = 0; k <= 9; k++) {
                    f += '##' + g[T].replace('K', r[s]).replace('K', r[v]).replace('X', d).replace('X', k).replace('O', 'X')
                  }
        else if (3 == t.length)
          for (s = 0; s < r.length; s++)
            for (v = 0; v < r.length; v++)
              for (d = 0; d < r.length; d++)
                for (k = 0; k <= 9; k++) {
                  f += '##' + m.replace('K', r[s]).replace('K', r[v]).replace('K', r[d]).replace('X', k)
                }
        else if (4 == t.length)
          for (T = 0; T < g.length; T++)
            for (v = 0; v < r.length; v++)
              for (_ = 0; _ < r.length; _++)
                for (k = 0; k < r.length; k++)
                  for (d = 0; d < r.length; d++) {
                    var N = g[T].replace('K', r[v])
                    f += '##' + (N = (N = (N = (N = N.replace('K', r[_])).replace('K', r[k])).replace('K', r[d])).replace('O', 'X'))
                  }
      } else {
        if (t.length > 2) return []
        for (var S = ['OXXXO', 'XXXOO'], A = 0; A < S.length; A++) {
          for (h = X(S[A]), s = 0; s < t.length; s++) h[t[s]] = 'K'
          if (!(M((m = h.join('')), 'X') < 3))
            if (1 == t.length)
              for (y = X(m), v = 0; v < r.length; v++)
                for (O = m.replace('K', r[v]), k = 0; k <= 9; k++) {
                  var C = O.replace('O', k)
                  c.push(C)
                }
            else if (2 == t.length)
              for (v = 0; v < r.length; v++)
                for (w = m.replace('K', r[v]), _ = 0; _ < r.length; _++) {
                  var $
                  ;(($ = ($ = w).replace('K', r[_])), c.push($))
                }
        }
      }
      return ('' != f && '##' != f && (c = f.replace('##', '').split('##')), 'move' == l && (c = e.minus(c)), x(c))
    }
    function f(t, a, n, i) {
      if (n.length > 0) {
        for (var l = [], r = 0; r < n.length; r++) {
          for (var o = X(n[r].replace(/[^0-9]/g, '')), s = 0, u = 0; u < o.length; u++) t.indexOf(o[u]) >= 0 && s++
          'move' == i ? s != o.length && l.push(n[r]) : s == o.length && l.push(n[r])
        }
        return l
      }
      var p = []
      if (2 == a) {
        var d = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO']
        for (r = 0; r < d.length; r++)
          for (var c = 0; c <= 9; c++)
            for (u = 0; u <= 9; u++) {
              if (t.indexOf(c) >= 0 && t.indexOf(u) >= 0) ((y = (y = d[r].replace('O', c)).replace('O', u)), p.push(y))
            }
      } else if (3 == a)
        for (d = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], r = 0; r < d.length; r++)
          for (c = 0; c <= 9; c++)
            for (u = 0; u <= 9; u++)
              for (var f = 0; f <= 9; f++) {
                if (t.indexOf(c) >= 0 && t.indexOf(u) >= 0 && t.indexOf(f) >= 0) ((y = (y = (y = d[r].replace('O', c)).replace('O', u)).replace('O', f)), p.push(y))
              }
      else if (4 == a) {
        d = ['XOOOO', 'OXOOO', 'OOXOO', 'OOOXO', 'OOOOX']
        for (var h = 0; h < d.length; h++)
          for (r = 0; r <= 9; r++)
            for (u = 0; u <= 9; u++)
              for (c = 0; c <= 9; c++)
                for (f = 0; f <= 9; f++)
                  if (t.indexOf(r) >= 0 && t.indexOf(u) >= 0 && t.indexOf(c) >= 0 && t.indexOf(f) >= 0) {
                    var m = d[h]
                    ;((m = (m = (m = (m = m.replace('O', r)).replace('O', u)).replace('O', c)).replace('O', f)), p.push(m))
                  }
      } else
        for (d = ['OXXXO', 'XXXOO'], r = 0; r < d.length; r++)
          for (c = 0; c <= 9; c++)
            for (u = 0; u <= 9; u++) {
              var y
              if (t.indexOf(c) >= 0 && t.indexOf(u) >= 0) ((y = (y = d[r].replace('O', c)).replace('O', u)), layui.$.inArray(y, p) < 0 && p.push(y))
            }
      return ('move' == i && (p = e.minus(p)), p)
    }
    function h(t, a, n, i) {
      if (null != a && a.length > 0) {
        for (var l = [], r = 0; r < a.length; r++) {
          var o = X(a[r]),
            s = !1
          t: for (var u = 0; u < o.length; u++)
            for (var p = u + 1; p < o.length; p++)
              if ('X' != o[r] && '' != o[u] && (1 == Math.abs(1 * o[u] - 1 * o[p]) || 9 == Math.abs(1 * o[u] - 1 * o[p]))) {
                s = !0
                break t
              }
          'move' == n ? s || l.push(a[r]) : s && l.push(a[r])
        }
        return l
      }
      var d = [],
        c = ''
      if (0 == i)
        if (2 == t)
          for (var f = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO'], h = 0; h < f.length; h++)
            for (r = 0; r <= 9; r++)
              for (u = 0; u <= 9; u++) {
                if (1 == Math.abs(r - u) || 9 == Math.abs(r - u)) c += '##' + (g = (g = (g = f[h]).replace('O', r)).replace('O', u))
              }
        else if (3 == t)
          for (f = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], h = 0; h < f.length; h++)
            for (r = 0; r <= 9; r++)
              for (u = 0; u <= 9; u++)
                for (p = 0; p <= 9; p++) {
                  if (1 == Math.abs(r - u) || 9 == Math.abs(r - u) || 1 == Math.abs(p - u) || 9 == Math.abs(p - u) || 1 == Math.abs(r - p) || 9 == Math.abs(r - p)) c += '##' + (g = (g = (g = (g = f[h]).replace('O', r)).replace('O', u)).replace('O', p))
                }
        else if (4 == t)
          for (o = ['01', '12', '23', '34', '45', '56', '67', '78', '89', '09'], f = ['KKOOX', 'KKOXO', 'KKXOO', 'KXOOK', 'KXKOO', 'KXOKO', 'OOKKX', 'OOKXK', 'OOXKK', 'OXOKK', 'OXKOK', 'OXKKO', 'XKKOO', 'XOOKK'], u = 0; u < f.length; u++)
            for (r = 0; r < o.length; r++)
              for (p = 0; p < 10; p++)
                for (var m = 0; m < 10; m++) {
                  var y = X(o[r])
                  ;((g = (g = (g = (g = (g = f[u]).replace('O', y[0])).replace('O', y[1])).replace('K', p)).replace('K', m)),
                    c.indexOf(g) < 0 && (c += '##' + g),
                    (g = (g = (g = (g = (g = f[u]).replace('O', y[1])).replace('O', y[0])).replace('K', p)).replace('K', m)),
                    c.indexOf(g) < 0 && (c += '##' + g))
                }
        else
          for (f = ['OXXXO', 'XXXOO'], h = 0; h < f.length; h++)
            for (r = 0; r <= 9; r++)
              for (u = 0; u <= 9; u++) {
                var g
                if (1 == Math.abs(r - u) || 9 == Math.abs(r - u)) c += '##' + (g = (g = (g = f[h]).replace('O', r)).replace('O', u))
              }
      return ('' != c && '##' != c && (d = c.replace('##', '').split('##')), 'move' == n && 5 != t && (d = e.minus(d)), d)
    }
    function m(t, a, n, i) {
      if (null != a && a.length > 0) {
        for (var l = [], r = 0; r < a.length; r++) {
          for (var o = X(a[r].replace(/[^0-9]/g, '')), s = !1, u = 0; u < o.length; u++)
            if (w(a[r], o[u]) > 1) {
              s = !0
              break
            }
          'move' == n ? s || l.push(a[r]) : s && l.push(a[r])
        }
        return l
      }
      var p = []
      if (0 == i)
        if (2 == t) {
          var d = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO']
          for (u = 0; u < d.length; u++)
            for (r = 0; r <= 9; r++) {
              var c = d[u].replace(/O/g, r)
              p.push(c)
            }
        } else if (3 == t) {
          for (d = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], u = 0; u < d.length; u++)
            for (r = 0; r <= 9; r++)
              for (var f = 0; f <= 9; f++)
                for (var h = 0; h <= 9; h++)
                  if (r == f || r == h || f == h) {
                    var m = d[u].replace('O', r)
                    ;((m = (m = m.replace('O', f)).replace('O', h)), p.push(m))
                  }
        } else if (4 == t) {
          d = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO']
          var y = ''
          for (u = 0; u < d.length; u++)
            for (r = 0; r <= 9; r++) {
              c = (c = d[u].replace('O', r)).replace('O', r)
              for (h = 0; h <= 9; h++)
                for (f = 0; f <= 9; f++) {
                  var g = c.replace('X', h)
                  y += '##' + (g = g.replace('X', f))
                }
            }
          p = y.replace('##', '').split('##')
        } else if (5 == t) {
          var b = ['OXXXO', 'XXXOO']
          y = ''
          for (r = 0; r < b.length; r++)
            for (u = 0; u <= 9; u++)
              if ('move' == n) for (f = 0; f <= 9; f++) u != f && (y += '##' + b[r].replace('O', u).replace('O', f))
              else y += '##' + b[r].replace(/O/g, u)
          p = y.replace('##', '').split('##')
        }
      return ('move' == n && 5 != t && (p = e.minus(p)), x(p))
    }
    function y(t, e) {
      var a = [],
        n = X(e[0]),
        i = ''
      if (2 == t)
        for (var l = 0; l < 10; l++)
          for (var r = 0; r < n.length; r++) {
            i += '##' + [l, n[r]].sort().join('')
          }
      else if (3 == t)
        for (l = 0; l < 10; l++)
          for (var o = 0; o < 10; o++)
            for (r = 0; r < n.length; r++) {
              i += '##' + [l, o, n[r]].sort().join('')
            }
      else if (4 == t)
        for (l = 0; l < 10; l++)
          for (o = 0; o < 10; o++)
            for (var s = 0; s < 10; s++)
              for (r = 0; r < n.length; r++) {
                i += '##' + [l, o, s, n[r]].sort().join('')
              }
      return ('' != i && '##' != i && (a = i.replace('##', '').split('##')), (a = x(a)))
    }
    function g(t, e) {
      var a = [],
        n = X(e[0]),
        i = X(e[1]),
        l = ''
      if (2 == t)
        for (var r = 0; r < i.length; r++)
          for (var o = 0; o < n.length; o++) {
            l += '##' + [i[r], n[o]].sort().join('')
          }
      else if (3 == t)
        for (r = 0; r < 10; r++)
          for (var s = 0; s < i.length; s++)
            for (o = 0; o < n.length; o++) {
              l += '##' + [r, i[s], n[o]].sort().join('')
            }
      else if (4 == t)
        for (r = 0; r < 10; r++)
          for (s = 0; s < 10; s++)
            for (var u = 0; u < i.length; u++)
              for (o = 0; o < n.length; o++) {
                l += '##' + [r, s, i[u], n[o]].sort().join('')
              }
      return ('' != l && '##' != l && (a = l.replace('##', '').split('##')), (a = x(a)))
    }
    function b(t, e) {
      var a = [],
        n = X(e[0]),
        i = X(e[1]),
        l = X(e[2]),
        r = ''
      if (3 == t)
        for (var o = 0; o < l.length; o++)
          for (var s = 0; s < i.length; s++)
            for (var u = 0; u < n.length; u++) {
              r += '##' + [l[o], i[s], n[u]].sort().join('')
            }
      else if (4 == t)
        for (o = 0; o < 10; o++)
          for (s = 0; s < l.length; s++)
            for (var p = 0; p < i.length; p++)
              for (u = 0; u < n.length; u++) {
                r += '##' + [o, l[s], i[p], n[u]].sort().join('')
              }
      return ('' != r && '##' != r && (a = r.replace('##', '').split('##')), (a = x(a)))
    }
    function v(t, e) {
      var a = [],
        n = ''
      if ((t = t.toString()).length > 1) return a
      if (2 == e)
        for (var i = 0; i <= 9; i++)
          for (var l = 0; l <= 9; l++) {
            if (t.indexOf(i) >= 0 || t.indexOf(l) >= 0) n += '##' + [i, l].sort().join('')
          }
      else if (3 == e)
        for (i = 0; i <= 9; i++)
          for (l = 0; l <= 9; l++)
            for (var r = 0; r <= 9; r++) {
              if (t.indexOf(i) >= 0 || t.indexOf(l) >= 0 || t.indexOf(r) >= 0) n += '##' + [i, l, r].sort().join('')
            }
      else
        for (i = 0; i <= 9; i++)
          for (l = 0; l <= 9; l++)
            for (r = 0; r <= 9; r++)
              for (var o = 0; o <= 9; o++) {
                if (t.indexOf(i) >= 0 || t.indexOf(l) >= 0 || t.indexOf(r) >= 0 || t.indexOf(o) >= 0) n += '##' + [i, l, r, o].sort().join('')
              }
      return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
    }
    function O(t, e) {
      var a = [],
        n = []
      if (t.length > 2) return n
      if (2 == t.length && 0 == t[0] && 3 == t[1]) return n
      for (var i = X('XXXXX'), l = 0; l < t.length; l++) i[t[l]] = 'O'
      var r = ''
      if (1 == t.length);
      else {
        var o = i.join('')
        for (X(e), l = 0; l <= 9; l++)
          for (var s = 0; s <= 9; s++) {
            var u = X(s + l + ''),
              p = u[u.length - 1]
            if (e.indexOf(p) >= 0) r += '##' + o.replace('O', l).replace('O', s)
          }
      }
      return ('' != r && '##' != r && (a = r.replace('##', '').split('##')), a)
    }
    function X(t) {
      for (var e = [], a = 0; a < t.length; a++) e.push(t.charAt(a))
      return e
    }
    function x(t) {
      return _toConsumableArray(new Set(t))
    }
    function k(t, e) {
      return x(t.concat(e))
    }
    function w(t, e) {
      var a = new RegExp(e, 'g'),
        n = t.match(a)
      return n ? n.length : 0
    }
    function M(t, e) {
      var a = new RegExp(e, 'g'),
        n = t.match(a)
      return n ? n.length : 0
    }
    ;((Array.prototype.intersectD = function (t) {
      var e = [],
        a = ''
      if (this.length > t.length) {
        var n = this.join('##')
        for (i = 0; i < t.length; i++) n.indexOf(t[i]) >= 0 && (a += '##' + t[i])
        '' != a && '##' != a && (e = a.replace('##', '').split('##'))
      } else {
        n = t.join('##')
        for (i = 0; i < this.length; i++) n.indexOf(this[i]) >= 0 && (a += '##' + this[i])
        '' != a && '##' != a && (e = a.replace('##', '').split('##'))
      }
      return e
    }),
      (Array.prototype.minus = function (t) {
        for (var e = [], a = {}, n = 0; n < t.length; n++) a[t[n]] = 1
        for (var i = 0; i < this.length; i++) a[this[i]] || ((a[this[i]] = 1), e.push(this[i]))
        return e
      }),
      (String.prototype.replacePos = function (t, e, a) {
        var n = []
        if (e <= t.length && e >= 0) {
          for (var i = 0; i < t.length; i++) n.push(t.charAt(i))
          return ((n[e] = a), n.join(''))
        }
        return t
      }),
      t('quickSelectRuleV2For5', {
        array_union: k,
        remove_repeat: x,
        allNumAppear: function (t) {
          var e = [],
            a = ''
          if (2 == t)
            for (var n = 0; n <= 9; n++)
              for (var i = 0; i <= 9; i++) {
                a += '##' + [n, i].sort().join('')
              }
          else if (3 == t)
            for (n = 0; n <= 9; n++)
              for (i = 0; i <= 9; i++)
                for (var l = 0; l <= 9; l++) {
                  a += '##' + [n, i, l].sort().join('')
                }
          else if (4 == t)
            for (var r = 0; r <= 9; r++)
              for (n = 0; n <= 9; n++)
                for (l = 0; l <= 9; l++)
                  for (i = 0; i <= 9; i++) {
                    a += '##' + [r, n, l, i].sort().join('')
                  }
          return ('' != a && '##' != a && (e = x((e = a.replace('##', '').split('##')))), e)
        },
        peiArrAppear: function (t, e) {
          var a = [],
            n = ''
          if (2 == e) {
            var i = []
            ;(t.peiOne && i.push(t.peiOne), t.peiTwo && i.push(t.peiTwo), 1 == i.length ? (a = y(e, i)) : 2 == i.length && (a = g(e, i)))
          } else if (3 == e) {
            i = []
            ;(t.peiOne && i.push(t.peiOne), t.peiTwo && i.push(t.peiTwo), t.peiThr && i.push(t.peiThr), 1 == i.length ? (a = y(e, i)) : 2 == i.length ? (a = g(e, i)) : 3 == i.length && (a = b(e, i)))
          } else if (4 == e) {
            i = []
            if ((t.peiOne && i.push(t.peiOne), t.peiTwo && i.push(t.peiTwo), t.peiThr && i.push(t.peiThr), t.peiFour && i.push(t.peiFour), 1 == i.length)) a = y(e, i)
            else if (2 == i.length) a = g(e, i)
            else if (3 == i.length) a = b(e, i)
            else if (4 == i.length) {
              for (var l = X(i[0]), r = X(i[1]), o = X(i[2]), s = X(i[3]), u = 0; u < s.length; u++)
                for (var p = 0; p < o.length; p++)
                  for (var d = 0; d < r.length; d++)
                    for (var c = 0; c < l.length; c++) {
                      n += '##' + [s[u], o[p], r[d], l[c]].sort().join('')
                    }
              ;('' != n && '##' != n && (a = n.replace('##', '').split('##')), (a = x(a)))
            }
          }
          return a
        },
        phFiveRule: function (t, e) {
          var a = [],
            n = O(t.thousandhf, t.thousand_put),
            i = O(t.hundredhf, t.hundred_put),
            l = O(t.tenhf, t.ten_put),
            r = !0
          return (
            null != t.thousandhf && '' != t.thousand_put && (a.length < 1 ? (a = n).length < 1 && (r = !1) : (a = n.intersectD(a)), a.length < 1 && (r = !1)),
            null != t.hundredhf && '' != t.hundred_put && 0 == (a = a.length < 1 && r ? i : i.intersectD(a)).length && (r = !1),
            null != t.tenhf && '' != t.ten_put && 0 == (a = a.length < 1 && r ? l : l.intersectD(a)).length && (r = !1),
            a
          )
        },
        mabsFive: function (t) {
          var e = []
          if (t.opposition_one.length > 0 || t.opposition_two.length > 0 || t.opposition_three.length > 0) {
            var a = doMabsFive(X(t.opposition_one), type),
              n = doMabsFive(X(t.opposition_two), type),
              i = doMabsFive(X(t.opposition_three), type),
              l = k(a, n)
            e = l = k(l, i)
          } else {
            for (var r = ['OXXXO', 'XXXOO'], o = '', s = 0; s < r.length; s++)
              for (var u = 0; u <= 9; u++)
                for (var p = 0; p <= 9; p++)
                  if (5 == Math.abs(p - u)) {
                    var d = r[s]
                    o += '##' + (d = (d = d.replace('O', u)).replace('O', p))
                  }
            '' != o && '##' != o && (e = o.replace('##', '').split('##'))
          }
          return e
        },
        posHfive: O,
        containerNumFive: function (t) {
          for (var e = [], a = '', n = ['OXXXO', 'XXXOO'], i = 0; i < n.length; i++)
            for (var l = 0; l <= 9; l++)
              for (var r = 0; r <= 9; r++)
                if (t.indexOf(l) >= 0 || t.indexOf(r) >= 0) {
                  var o = n[i].replace('O', l)
                  a += '##' + (o = o.replace('O', r))
                }
          return ('' != a && '##' != a && (e = a.replace('##', '').split('##')), e)
        },
        oddTypeAppearNew: function (t, e, a) {
          var n = [],
            i = '',
            l = [],
            r = ''
          l = 'evens' == a ? ['0', '2', '4', '6', '8'] : ['1', '3', '5', '7', '9']
          var o = [],
            s = [],
            u = [],
            p = []
          if (2 == e) {
            for (var d = X('XX'), c = 0; c < t.length; c++) d[t[c]] = 'K'
            var f = d.join('')
            1 == t.length ? (0 == f.indexOf('K') ? ((o = l), (s = X('0123456789'))) : ((o = X('0123456789')), (s = l))) : 2 == t.length && ((o = l), (s = l))
            for (c = 0; c < o.length; c++)
              for (var h = 0; h < s.length; h++)
                if (s[h] >= o[c]) {
                  ;[o[c], s[h]].join('')
                  i += '##' + [o[c], s[h]].sort().join('')
                }
          } else if (3 == e) {
            for (d = X('XXX'), c = 0; c < t.length; c++) d[t[c]] = 'K'
            f = d.join('')
            1 == t.length
              ? 0 == f.indexOf('K')
                ? ((o = l), (s = X('0123456789')), (u = X('0123456789')))
                : 1 == f.indexOf('K')
                  ? ((o = X('0123456789')), (s = l), (u = X('0123456789')))
                  : ((o = X('0123456789')), (s = X('0123456789')), (u = l))
              : 2 == t.length
                ? 0 == f.indexOf('X')
                  ? ((o = X('0123456789')), (s = l), (u = l))
                  : 1 == f.indexOf('X')
                    ? ((o = l), (s = X('0123456789')), (u = l))
                    : ((o = l), (s = l), (u = X('0123456789')))
                : 3 == t.length && ((o = l), (s = l), (u = l))
            for (c = 0; c < o.length; c++)
              for (h = 0; h < s.length; h++)
                for (var m = 0; m < u.length; m++)
                  if (s[h] >= o[c] && u[m] >= s[h]) {
                    ;[o[c], s[h], u[m]].join('')
                    i += '##' + [o[c], s[h], u[m]].sort().join('')
                  }
          } else if (4 == e) {
            for (d = X('XXXX'), c = 0; c < t.length; c++) d[t[c]] = 'K'
            r = d.join('')
            1 == t.length
              ? 0 == r.indexOf('K')
                ? ((o = l), (s = X('0123456789')), (u = X('0123456789')), (p = X('0123456789')))
                : 1 == r.indexOf('K')
                  ? ((o = X('0123456789')), (s = l), (u = X('0123456789')), (p = X('0123456789')))
                  : 2 == r.indexOf('K')
                    ? ((o = X('0123456789')), (s = X('0123456789')), (u = l), (p = X('0123456789')))
                    : ((o = X('0123456789')), (s = X('0123456789')), (u = X('0123456789')), (p = l))
              : 2 == t.length
                ? 0 == r.indexOf('K') && 1 == r.lastIndexOf('K')
                  ? ((o = l), (s = l), (u = X('0123456789')), (p = X('0123456789')))
                  : 0 == r.indexOf('K') && 2 == r.lastIndexOf('K')
                    ? ((o = l), (s = X('0123456789')), (u = l), (p = X('0123456789')))
                    : 0 == r.indexOf('K') && 3 == r.lastIndexOf('K')
                      ? ((o = l), (s = X('0123456789')), (u = X('0123456789')), (p = l))
                      : 1 == r.indexOf('K') && 2 == r.lastIndexOf('K')
                        ? ((o = X('0123456789')), (s = l), (u = l), (p = X('0123456789')))
                        : 1 == r.indexOf('K') && 3 == r.lastIndexOf('K')
                          ? ((o = X('0123456789')), (s = l), (u = X('0123456789')), (p = l))
                          : 2 == r.indexOf('K') && 3 == r.lastIndexOf('K') && ((o = X('0123456789')), (s = X('0123456789')), (u = l), (p = l))
                : 3 == t.length
                  ? 0 == r.indexOf('X')
                    ? ((o = X('0123456789')), (s = l), (u = l), (p = l))
                    : 1 == r.indexOf('X')
                      ? ((o = l), (s = X('0123456789')), (u = l), (p = l))
                      : 2 == r.indexOf('X')
                        ? ((o = l), (s = l), (u = X('0123456789')), (p = l))
                        : ((o = l), (s = l), (u = l), (p = X('0123456789')))
                  : 4 == t.length && ((o = l), (s = l), (u = l), (p = l))
            for (c = 0; c < o.length; c++)
              for (h = 0; h < s.length; h++)
                for (m = 0; m < u.length; m++)
                  for (var y = 0; y < p.length; y++)
                    if (s[h] >= o[c] && u[m] >= s[h] && p[y] >= u[m]) {
                      ;[o[c], s[h], u[m], p[y]].join('')
                      i += '##' + [o[c], s[h], u[m], p[y]].sort().join('')
                    }
          }
          return ('' != i && '##' != i && (n = i.replace('##', '').split('##')), n)
        },
        tdoubleAppear: function (t) {
          var e = [],
            a = ''
          if (3 == t)
            for (var n = 0; n <= 9; n++) {
              a += '##' + [n, n, n].join('')
            }
          else if (4 == t)
            for (n = 0; n <= 9; n++)
              for (var i = 0; i <= 9; i++) {
                a += '##' + [n, i, i, i].join('') + '##' + [n, n, n, i].join('')
              }
          return ('' != a && '##' != a && (e = a.replace('##', '').split('##')), e)
        },
        doubleAppear: function (t) {
          var e = [],
            a = ''
          if (2 == t)
            for (var n = 0; n <= 9; n++) {
              var i = [n, n].join('')
              e.push(i)
            }
          else if (3 == t)
            for (n = 0; n <= 9; n++)
              for (var l = 0; l <= 9; l++)
                for (var r = 0; r <= 9; r++) {
                  if (n == l || l == r || n == r) a += '##' + (i = [n, r, l].sort().join(''))
                }
          else if (4 == t)
            for (r = 0; r <= 9; r++)
              for (n = 0; n <= 9; n++)
                for (l = 0; l <= 9; l++) {
                  a += '##' + (i = [r, r, n, l].sort().join('')) + '##' + [r, n, n, l].sort().join('') + '##' + [r, n, l, l].sort().join('')
                }
          return ('' != a && '##' != a && (e = a.replace('##', '').split('##')), e)
        },
        fourBrotherAppear: function (t) {
          for (var e = [], a = '', n = ['0123', '1234', '2345', '3456', '4567', '5678', '6789', '0789', '0189', '0129'], i = 0; i <= 9; i++)
            for (var l = 0; l <= 9; l++)
              for (var r = 0; r <= 9; r++)
                for (var o = 0; o <= 9; o++) {
                  var s = [i, l, r, o].sort().join('')
                  layui.$.inArray(s, n) >= 0 && (a += '##' + s)
                }
          return ('' != a && '##' != a && (e = a.replace('##', '').split('##')), e)
        },
        threeBrotherAppear: function (t) {
          var e = [],
            a = ''
          if (3 == t)
            for (var n = ['012', '123', '234', '345', '456', '567', '678', '789', '089', '019'], i = 0; i <= 9; i++)
              for (var l = 0; l <= 9; l++)
                for (var r = 0; r <= 9; r++) {
                  var o = [i, l, r].sort().join('')
                  if (layui.$.inArray(o, n) >= 0) a += '##' + [i, l, r].sort().join('')
                }
          else if (4 == t)
            for (n = ['012', '123', '234', '345', '456', '567', '678', '789', '089', '019'], i = 0; i <= 9; i++)
              for (l = 0; l <= 9; l++)
                for (r = 0; r <= 9; r++)
                  for (var s = 0; s <= 9; s++) {
                    var u = [i, l, r].sort().join(''),
                      p = ((o = [i, r, s].sort().join('')), [l, r, s].sort().join('')),
                      d = [i, l, s].sort().join('')
                    if (layui.$.inArray(u, n) >= 0 || layui.$.inArray(o, n) >= 0 || layui.$.inArray(p, n) >= 0 || layui.$.inArray(d, n) >= 0) a += '##' + [i, l, r, s].sort().join('')
                  }
          return ('' != a && '##' != a && (e = a.replace('##', '').split('##')), e)
        },
        twoBrotherAppear: function (t) {
          var e = [],
            a = ''
          if (2 == t)
            for (var n = 0; n <= 9; n++)
              for (var i = n; i <= 9; i++) {
                if (1 == Math.abs(n - i) || 9 == Math.abs(n - i)) a += '##' + [n, i].join('')
              }
          else if (3 == t) {
            var l = ['01', '12', '23', '34', '45', '56', '67', '78', '89', '09']
            for (n = 0; n <= 9; n++)
              for (i = 0; i <= 9; i++)
                for (var r = 0; r <= 9; r++) {
                  var o = [n, i].sort().join(''),
                    s = [n, r].sort().join(''),
                    u = [i, r].sort().join('')
                  if (layui.$.inArray(o, l) >= 0 || layui.$.inArray(s, l) >= 0 || layui.$.inArray(u, l) >= 0) a += '##' + [n, i, r].sort().join('')
                }
          } else if (4 == t)
            for (l = ['01', '12', '23', '34', '45', '56', '67', '78', '89', '09'], n = 0; n <= 9; n++)
              for (i = 0; i <= 9; i++)
                for (r = 0; r <= 9; r++)
                  for (var p = 0; p <= 9; p++) {
                    var d = [n, i, r, p].sort().join(''),
                      c = [n, i].sort().join(''),
                      f = [n, p].sort().join(''),
                      h = [n, r].sort().join(''),
                      m = [i, p].sort().join(''),
                      y = [i, r].sort().join(''),
                      g = [r, p].sort().join('')
                    ;(layui.$.inArray(c, l) >= 0 || layui.$.inArray(f, l) >= 0 || layui.$.inArray(h, l) >= 0 || layui.$.inArray(m, l) >= 0 || layui.$.inArray(y, l) >= 0 || layui.$.inArray(g, l) >= 0) && (a += '##' + d)
                  }
          return ('' != a && '##' != a && (e = a.replace('##', '').split('##')), e)
        },
        compoundAppear: function (t, e) {
          var a = [],
            n = ''
          if (2 == e)
            for (var i = X(t), l = 0; l < t.length; l++)
              for (var r = 0; r < t.length; r++) {
                ;[i[l], i[r]].join('')
                n += '##' + [i[l], i[r]].sort().join('')
              }
          else if (3 == e)
            for (i = X(t), l = 0; l < t.length; l++)
              for (r = 0; r < t.length; r++)
                for (var o = 0; o < t.length; o++) {
                  ;[i[l], i[r], i[o]].join('')
                  n += '##' + [i[l], i[r], i[o]].sort().join('')
                }
          else if (4 == e)
            for (i = X(t), l = 0; l < t.length; l++)
              for (r = 0; r < t.length; r++)
                for (o = 0; o < t.length; o++)
                  for (var s = 0; s < t.length; s++) {
                    ;[i[l], i[r], i[o], i[s]].join('')
                    n += '##' + [i[l], i[r], i[o], i[s]].sort().join('')
                  }
          return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
        },
        appearHfRule: function (t, e, a, n) {
          var i = [],
            l = ''
          if (t) {
            if (2 == a)
              for (var r = 0; r <= 9; r++)
                for (var o = r; o <= 9; o++) {
                  l += '##' + [r, o].sort().join('')
                }
            else if (3 == a)
              for (r = 0; r <= 9; r++)
                for (o = r; o <= 9; o++)
                  for (var s = o; s <= 9; s++) {
                    l += '##' + [r, o, s].sort().join('')
                  }
            else if (4 == a)
              for (r = 0; r <= 9; r++)
                for (o = r; o <= 9; o++)
                  for (s = o; s <= 9; s++)
                    for (var u = s; u <= 9; u++) {
                      l += '##' + [r, o, s, u].sort().join('')
                    }
          } else if (2 == a)
            for (r = 0; r <= 9; r++)
              for (o = r; o <= 9; o++) {
                var p = (h = X(r + o + ''))[h.length - 1]
                if (e.indexOf(p) >= 0) l += '##' + [r, o].sort().join('')
              }
          else if (3 == a)
            if (2 == n)
              for (r = 0; r <= 9; r++)
                for (o = r; o <= 9; o++)
                  for (s = o; s <= 9; s++) {
                    var d = (O = X(r + s + ''))[O.length - 1],
                      c = (x = X(r + o + ''))[x.length - 1],
                      f = (k = X(o + s + ''))[k.length - 1]
                    if (e.indexOf(d) >= 0 || e.indexOf(c) >= 0 || e.indexOf(f) >= 0) l += '##' + [r, o, s].sort().join('')
                  }
            else
              for (r = 0; r <= 9; r++)
                for (o = r; o <= 9; o++)
                  for (s = o; s <= 9; s++) {
                    var h
                    p = (h = X(r + o + s + ''))[h.length - 1]
                    if (e.indexOf(p) >= 0) l += '##' + [r, o, s].sort().join('')
                  }
          else if (4 == a)
            if (2 == n)
              for (r = 0; r <= 9; r++)
                for (o = 0; o <= 9; o++)
                  for (s = 0; s <= 9; s++)
                    for (u = 0; u <= 9; u++) {
                      ;((d = (O = X(r + s + ''))[O.length - 1]), (c = (x = X(r + o + ''))[x.length - 1]), (f = (k = X(r + u + ''))[k.length - 1]))
                      var m = (w = X(s + o + ''))[w.length - 1],
                        y = X(u + s + ''),
                        g = y[y.length - 1],
                        b = X(u + o + ''),
                        v = b[b.length - 1]
                      if (e.indexOf(d) >= 0 || e.indexOf(c) >= 0 || e.indexOf(f) >= 0 || e.indexOf(m) >= 0 || e.indexOf(g) >= 0 || e.indexOf(v) >= 0) l += '##' + [r, o, s, u].sort().join('')
                    }
            else
              for (r = 0; r <= 9; r++)
                for (o = 0; o <= 9; o++)
                  for (s = 0; s <= 9; s++)
                    for (u = 0; u <= 9; u++) {
                      var O, x, k, w
                      ;((d = (O = X(r + o + s + ''))[O.length - 1]), (c = (x = X(r + o + u + ''))[x.length - 1]), (f = (k = X(u + o + s + ''))[k.length - 1]), (m = (w = X(u + r + s + ''))[w.length - 1]))
                      if (e.indexOf(d) >= 0 || e.indexOf(c) >= 0 || e.indexOf(f) >= 0 || e.indexOf(m) >= 0) l += '##' + [r, o, s, u].sort().join('')
                    }
          return ('' != l && '##' != l && (i = l.replace('##', '').split('##')), i)
        },
        strToArr: X,
        containerNumAppear: function (t, e) {
          var a = [],
            n = ''
          if (2 == e)
            for (var i = 0; i <= 9; i++)
              for (var l = 0; l <= 9; l++) {
                var r = [i, l].sort().join('')
                t.indexOf(i) >= 0 && (n += '##' + r)
              }
          else if (3 == e)
            for (i = 0; i <= 9; i++)
              for (l = 0; l <= 9; l++)
                for (var o = 0; o <= 9; o++) {
                  r = [i, l, o].sort().join('')
                  ;(t.indexOf(i) >= 0 || t.indexOf(l) >= 0 || t.indexOf(o) >= 0) && (n += '##' + r)
                }
          else if (4 == e)
            for (i = 0; i <= 9; i++)
              for (l = 0; l <= 9; l++)
                for (o = 0; o <= 9; o++)
                  for (var s = 0; s <= 9; s++) {
                    r = [i, l, o, s].sort().join('')
                    ;(t.indexOf(i) >= 0 || t.indexOf(l) >= 0 || t.indexOf(s) >= 0 || t.indexOf(o) >= 0) && (n += '##' + r)
                  }
          return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
        },
        mabsAppear: function (t, e) {
          var a = []
          if (t.opposition_one.length > 0 || t.opposition_two.length > 0 || t.opposition_three.length > 0) {
            var n = !1,
              i = []
            if ((2 == t.opposition_one.length && (i.push(t.opposition_one), (n = !0)), 2 == t.opposition_two.length && (i.push(t.opposition_two), (n = !0)), 2 == t.opposition_three.length && (i.push(t.opposition_three), (n = !0)), n)) {
              if (2 == e) a = i
              else if (3 == e) {
                for (var l = 0; l < i.length; l++)
                  if (2 == i[l].length)
                    for (var r = 0; r <= 9; r++) {
                      var o = X(i[l])
                      o.push(r)
                      var s = o.sort().join('')
                      layui.$.inArray(s, a) < 0 && a.push(s)
                    }
              } else if (4 == e)
                for (l = 0; l < i.length; l++)
                  if (2 == i[l].length)
                    for (var u = ['OOKX', 'KOOX', 'XOOK', 'XKOO'], p = 0; p < u.length; p++)
                      for (var d = 0; d <= 9; d++)
                        for (r = 0; r <= 9; r++) {
                          var c = u[p],
                            f = X((c = (c = (c = c.replace('OO', i[l])).replace('K', d)).replace('X', r)))
                              .sort()
                              .join('')
                          layui.$.inArray(f, a) < 0 && a.push(f)
                        }
            } else {
              var h = v(X(t.opposition_one), e),
                m = v(X(t.opposition_two), e),
                y = v(X(t.opposition_three), e),
                g = k(h, m)
              a = g = k(g, y)
            }
          } else {
            var b = ''
            if (2 == e)
              for (l = 0; l <= 9; l++)
                for (r = 0; r <= 9; r++) {
                  if (5 == Math.abs(r - l)) b += '##' + [l, r].sort().join('')
                }
            else if (3 == e)
              for (l = 0; l <= 9; l++)
                for (r = 0; r <= 9; r++)
                  for (p = 0; p <= 9; p++) {
                    if (5 == Math.abs(r - l) || 5 == Math.abs(p - l) || 5 == Math.abs(r - p)) b += '##' + [l, r, p].sort().join('')
                  }
            else if (4 == e)
              for (l = 0; l <= 9; l++)
                for (r = 0; r <= 9; r++)
                  for (p = 0; p <= 9; p++)
                    for (d = 0; d <= 9; d++) {
                      if (5 == Math.abs(r - l) || 5 == Math.abs(p - l) || 5 == Math.abs(r - p) || 5 == Math.abs(d - l) || 5 == Math.abs(d - p) || 5 == Math.abs(d - r)) b += '##' + [l, r, p, d].sort().join('')
                    }
            '' != b && '##' != b && (a = b.replace('##', '').split('##'))
          }
          return a
        },
        compoundFive: function (t, e) {
          for (var a = [], n = '', i = ['OXXXO', 'XXXOO'], l = 0; l < i.length; l++)
            for (var r = 0; r <= 9; r++)
              for (var o = 0; o <= 9; o++)
                if (t.indexOf(r) >= 0 && t.indexOf(o) >= 0) {
                  var s = i[l].replace('O', r)
                  n += '##' + (s = s.replace('O', o))
                }
          return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
        },
        xpositionFive: function (t, e) {
          var a = X('KXXKK')
          if (t.length > 1) return []
          if (1 == t.length && 4 == t[0]) return []
          for (var n = 0; n < t.length; n++) a[t[n]] = 'X'
          a = a.join('')
          var i = [],
            l = ''
          for (n = 0; n <= 9; n++)
            for (var r = 0; r <= 9; r++) {
              var o = a
              l += '##' + (o = (o = o.replace('K', n)).replace('K', r))
            }
          return ('' != l && '##' != l && (i = l.replace('##', '').split('##')), i)
        },
        positionNums: function (t, n, i) {
          var l = [],
            r = (function (t, e, a, n) {
              var i = 'XXXXX',
                l = {}
              if (t.length > 5 - a && 0 != t.length && 2 == a) return ((l.message = '请选择正确的乘号位置！'), (l.state = '101'), l)
              if (0 != t.length && t.length > 2 && 3 == a) return ((l.message = '请选择正确的乘号位置！'), (l.state = '101'), l)
              if (0 != t.length && t.length > 1 && 4 == a) return ((l.message = '请选择正确的乘号位置！'), (l.state = '101'), l)
              for (var r = X(i), o = 0; o < e.length; o++) r[e[o].position] = 'O'
              var s = r.join(''),
                u = [],
                d = ''
              if (e.length == a) {
                if (2 == a) {
                  for (var c = X(e[0].data), f = X(e[1].data), h = (e[0].data, e[1].data, 0); h < c.length; h++)
                    for (var m = 0; m < f.length; m++) {
                      d += '##' + s.replace('O', c[h]).replace('O', f[m])
                    }
                  if (('' != d && '##' != d && (u = x((u = d.replace('##', '').split('##')))), 'move' == n)) {
                    var y = p(a)
                    ;(console.error(y.length + '<<<<<>>>>' + u.length), (u = y.minus(u)))
                  }
                } else if (3 == a) {
                  ;((c = X(e[0].data)), (f = X(e[1].data)))
                  var g = X(e[2].data)
                  for (h = 0; h < c.length; h++)
                    for (m = 0; m < f.length; m++)
                      for (var b = 0; b < g.length; b++) {
                        d += '##' + s.replace('O', c[h]).replace('O', f[m]).replace('O', g[b])
                      }
                  if (('' != d && '##' != d && (u = x((u = d.replace('##', '').split('##')))), 'move' == n)) u = (y = p(a)).minus(u)
                } else if (4 == a) {
                  ;((c = X(e[0].data)), (f = X(e[1].data)), (g = X(e[2].data)))
                  var v = X(e[3].data)
                  for (h = 0; h < c.length; h++)
                    for (m = 0; m < f.length; m++)
                      for (b = 0; b < g.length; b++)
                        for (var O = 0; O < v.length; O++) {
                          d += '##' + s.replace('O', c[h]).replace('O', f[m]).replace('O', g[b]).replace('O', v[O])
                        }
                  if (('' != d && '##' != d && (u = x((u = d.replace('##', '').split('##')))), 'move' == n)) u = (y = p(a)).minus(u)
                }
                return ((l.message = '成功！'), (l.state = '100'), (l.list = u), l)
              }
              if (e.length < a && e.length > 0) {
                if (2 == a) {
                  for (var k = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO'], w = [], M = ((c = X(e[0].data)), 0); M < k.length; M++) {
                    var _ = X(k[M])
                    for (o = 0; o < e.length; o++) 'O' == _[e[o].position] && ((_[e[o].position] = 'K'), w.push(_.join('')))
                  }
                  for (M = 0; M < w.length; M++)
                    for (h = 0; h < c.length; h++)
                      for (b = 0; b <= 9; b++) {
                        d += '##' + w[M].replace('K', c[h]).replace('O', b)
                      }
                  if (('' != d && '##' != d && (u = x((u = d.replace('##', '').split('##')))), 'move' == n)) u = (y = p(a)).minus(u)
                } else if (3 == a) {
                  for (k = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], w = [], M = 0; M < k.length; M++) {
                    _ = X(k[M])
                    var j = 0
                    for (o = 0; o < e.length; o++) 'O' == _[e[o].position] && ((_[e[o].position] = 'K'), j++)
                    _.join('') != k[M] && j == e.length && w.push(_.join(''))
                  }
                  if (2 == e.length) {
                    c = X(e[0].data)
                    var T = X(e[1].data),
                      N = [],
                      S = ''
                    for (M = 0; M < w.length; M++)
                      for (var A = 0; A < c.length; A++)
                        for (h = 0; h < T.length; h++)
                          for (m = 0; m <= 9; m++) {
                            d += '##' + w[M].replace('K', c[A]).replace('K', T[h]).replace('O', m)
                          }
                    if (('' != d && '##' != d && (u = x((u = d.replace('##', '').split('##')))), 'move' == n)) u = (y = p(a)).minus(u)
                  } else if (1 == e.length) {
                    for (c = X(e[0].data), N = [], S = '', M = 0; M < w.length; M++)
                      for (A = 0; A < c.length; A++) {
                        S += '##' + w[M].replace('K', c[A])
                      }
                    N = S.replace('##', '').split('##')
                    for (M = 0; M < N.length; M++)
                      for (m = 0; m <= 9; m++)
                        for (O = 0; O <= 9; O++) {
                          d += '##' + N[M].replace('O', m).replace('O', O)
                        }
                    if (('' != d && '##' != d && (u = x((u = d.replace('##', '').split('##')))), 'move' == n)) u = (y = p(a)).minus(u)
                  }
                } else if (4 == a) {
                  for (k = ['OOOOX', 'OOOXO', 'OOXOO', 'OXOOO', 'XOOOO'], w = [], M = 0; M < k.length; M++) {
                    for (_ = X(k[M]), j = 0, o = 0; o < e.length; o++) 'O' == _[e[o].position] && ((_[e[o].position] = 'K'), j++)
                    j == e.length && w.push(_.join(''))
                  }
                  if (3 == e.length) {
                    for (c = X(e[0].data), T = X(e[1].data), g = X(e[2].data), N = [], S = '', M = 0; M < w.length; M++)
                      for (A = 0; A < c.length; A++)
                        for (h = 0; h < T.length; h++)
                          for (m = 0; m < g.length; m++)
                            for (b = 0; b < 10; b++) {
                              d += '##' + w[M].replace('K', c[A]).replace('K', T[h]).replace('K', g[m]).replace('O', b)
                            }
                    if (('' != d && '##' != d && (u = x((u = d.replace('##', '').split('##')))), 'move' == n)) u = (y = p(a)).minus(u)
                  } else if (2 == e.length) {
                    for (c = X(e[0].data), T = X(e[1].data), N = [], S = '', M = 0; M < w.length; M++)
                      for (A = 0; A < c.length; A++)
                        for (h = 0; h < T.length; h++)
                          for (b = 0; b < 10; b++)
                            for (m = 0; m < 10; m++) {
                              d += '##' + w[M].replace('K', c[A]).replace('K', T[h]).replace('O', b).replace('O', m)
                            }
                    if (('' != d && '##' != d && (u = x((u = d.replace('##', '').split('##')))), 'move' == n)) u = (y = p(a)).minus(u)
                  } else if (1 == e.length) {
                    for (c = X(e[0].data), N = [], S = '', M = 0; M < w.length; M++)
                      for (A = 0; A < c.length; A++)
                        for (b = 0; b <= 9; b++)
                          for (m = 0; m <= 9; m++)
                            for (O = 0; O <= 9; O++) {
                              d += '##' + w[M].replace('K', c[A]).replace('O', b).replace('O', m).replace('O', O)
                            }
                    if (('' != d && '##' != d && (u = x((u = d.replace('##', '').split('##')))), 'move' == n)) u = (y = p(a)).minus(u)
                  }
                }
                return ((l.message = '成功！'), (l.state = '100'), (l.list = u), l)
              }
              return e.length > a ? ((l.message = '请输入正确的号码！'), (l.state = '101'), l) : ((l.state = '100'), (l.list = u), l)
            })(t.ridePos, n, i, t.ps)
          return (
            r &&
              '100' == r.state &&
              (l = (function (t, n, i) {
                var l = [],
                  r = p(i)
                e = r
                var y = 0
                if ('move' == t.ps || 'get' == t.ps) (l = n).length > 0 && y++
                else if ('move' == t.pei || 'get' == t.pei) {
                  var g = a(t, i)
                  ;(l = 'move' == t.pei ? r.minus(g) : g).length > 0 && y++
                }
                var b = (function (t) {
                  var e = !1
                  null != t.thousandhf && '' != t.thousand_put && (e = !0)
                  null != t.hundredhf && '' != t.hundred_put && (e = !0)
                  null != t.tenhf && '' != t.ten_put && (e = !0)
                  null != t.onehf && '' != t.one_put && (e = !0)
                  return e
                })(t)
                if (('move' == t.hf || 'get' == t.hf) && b) {
                  if (l.length < 1 && y > 0) return []
                  var v = (function (t, a, n, i) {
                    if (n.length > 0) {
                      for (var l = [], r = 0; r < n.length; r++) {
                        var o = X(n[r]),
                          s = !0
                        if (t.thousandhf.length > 0 && '' != t.thousand_put)
                          if (1 == t.thousandhf.length) t.thousand_put.indexOf(o[t.thousandhf[0]]) < 0 && (s = !1)
                          else {
                            if (t.thousandhf.length > a) {
                              l = []
                              break
                            }
                            var u = 0,
                              p = !0
                            if (
                              (layui.$.each(t.thousandhf, function (t, e) {
                                if ('X' == o[e]) return ((p = !1), !1)
                                u += 1 * o[e]
                              }),
                              p)
                            ) {
                              var d = ('' + u).substr(('' + u).length - 1, 1)
                              t.thousand_put.indexOf(d) < 0 && (s = !1)
                            } else s = !1
                          }
                        if (t.hundredhf.length > 0 && '' != t.hundred_put)
                          if (1 == t.hundredhf.length) t.hundred_put.indexOf(o[t.hundredhf[0]]) < 0 && (s = !1)
                          else {
                            if (t.hundredhf.length > a) {
                              l = []
                              break
                            }
                            ;((u = 0), (p = !0))
                            if (
                              (layui.$.each(t.hundredhf, function (t, e) {
                                if ('X' == o[e]) return ((p = !1), !1)
                                u += 1 * o[e]
                              }),
                              p)
                            ) {
                              d = ('' + u).substr(('' + u).length - 1, 1)
                              t.hundred_put.indexOf(d) < 0 && (s = !1)
                            } else s = !1
                          }
                        if (t.tenhf.length > 0 && '' != t.ten_put)
                          if (1 == t.tenhf.length) t.ten_put.indexOf(o[t.tenhf[0]]) < 0 && (s = !1)
                          else {
                            if (t.tenhf.length > a) {
                              l = []
                              break
                            }
                            ;((u = 0), (p = !0))
                            if (
                              (layui.$.each(t.tenhf, function (t, e) {
                                if ('X' == o[e]) return ((p = !1), !1)
                                u += 1 * o[e]
                              }),
                              p)
                            ) {
                              d = ('' + u).substr(('' + u).length - 1, 1)
                              t.ten_put.indexOf(d) < 0 && (s = !1)
                            } else s = !1
                          }
                        if (t.onehf.length > 0 && '' != t.one_put)
                          if (1 == t.onehf.length) t.one_put.indexOf(o[t.onehf[0]]) < 0 && (s = !1)
                          else {
                            if (t.onehf.length > a) {
                              l = []
                              break
                            }
                            ;((u = 0), (p = !0))
                            if (
                              (layui.$.each(t.onehf, function (t, e) {
                                if ('X' == o[e]) return ((p = !1), !1)
                                u += 1 * o[e]
                              }),
                              p)
                            ) {
                              d = ('' + u).substr(('' + u).length - 1, 1)
                              t.one_put.indexOf(d) < 0 && (s = !1)
                            } else s = !1
                          }
                        'move' == i ? s || l.push(n[r]) : s && l.push(n[r])
                      }
                      return x(l)
                    }
                    var c = ''
                    if (2 == a)
                      for (var f = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO'], h = 0; h < f.length; h++)
                        t: for (r = 0; r < 10; r++)
                          for (var m = 0; m < 10; m++) {
                            ;((s = !0), (o = X(f[h].replace('O', r).replace('O', m))))
                            if (t.thousandhf.length > 0 && '' != t.thousand_put)
                              if (1 == t.thousandhf.length) {
                                if (t.thousand_put.indexOf(o[t.thousandhf[0]]) < 0) {
                                  s = !1
                                  continue
                                }
                              } else {
                                if (t.thousandhf.length > a) {
                                  s = !1
                                  continue
                                }
                                u = 0
                                for (var y = 0; y < t.thousandhf.length; y++) {
                                  var g = t.thousandhf[y]
                                  if ('X' == o[g]) break t
                                  u += 1 * o[g]
                                }
                                d = ('' + u).substr(('' + u).length - 1, 1)
                                t.thousand_put.indexOf(d) < 0 && (s = !1)
                              }
                            if (t.hundredhf.length > 0 && '' != t.hundred_put)
                              if (1 == t.hundredhf.length) {
                                if (t.hundred_put.indexOf(o[t.hundredhf[0]]) < 0) {
                                  s = !1
                                  continue
                                }
                              } else {
                                if (t.hundredhf.length > a) {
                                  s = !1
                                  continue
                                }
                                for (u = 0, y = 0; y < t.hundredhf.length; y++) {
                                  g = t.hundredhf[y]
                                  if ('X' == o[g]) break t
                                  u += 1 * o[g]
                                }
                                d = ('' + u).substr(('' + u).length - 1, 1)
                                t.hundred_put.indexOf(d) < 0 && (s = !1)
                              }
                            if (t.tenhf.length > 0 && '' != t.ten_put)
                              if (1 == t.tenhf.length) {
                                if (t.ten_put.indexOf(o[t.tenhf[0]]) < 0) {
                                  s = !1
                                  continue
                                }
                              } else {
                                if (t.tenhf.length > a) {
                                  s = !1
                                  continue
                                }
                                for (u = 0, y = 0; y < t.tenhf.length; y++) {
                                  g = t.tenhf[y]
                                  if ('X' == o[g]) break t
                                  u += 1 * o[g]
                                }
                                d = ('' + u).substr(('' + u).length - 1, 1)
                                t.ten_put.indexOf(d) < 0 && (s = !1)
                              }
                            if (t.onehf.length > 0 && '' != t.one_put)
                              if (1 == t.onehf.length) {
                                if (t.one_put.indexOf(o[t.onehf[0]]) < 0) {
                                  s = !1
                                  continue
                                }
                              } else {
                                if (t.onehf.length > a) {
                                  s = !1
                                  continue
                                }
                                for (u = 0, y = 0; y < t.onehf.length; y++) {
                                  g = t.onehf[y]
                                  if ('X' == o[g]) break t
                                  u += 1 * o[g]
                                }
                                d = ('' + u).substr(('' + u).length - 1, 1)
                                t.one_put.indexOf(d) < 0 && (s = !1)
                              }
                            s && (c += '##' + o.join(''))
                          }
                    else if (3 == a)
                      for (f = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], h = 0; h < f.length; h++)
                        t: for (r = 0; r < 10; r++)
                          for (m = 0; m < 10; m++)
                            for (var b = 0; b < 10; b++) {
                              ;((s = !0), (o = X(f[h].replace('O', r).replace('O', m).replace('O', b))))
                              if (t.thousandhf.length > 0 && '' != t.thousand_put)
                                if (1 == t.thousandhf.length) {
                                  if (t.thousand_put.indexOf(o[t.thousandhf[0]]) < 0) {
                                    s = !1
                                    continue
                                  }
                                } else {
                                  if (t.thousandhf.length > a) {
                                    s = !1
                                    continue
                                  }
                                  for (u = 0, y = 0; y < t.thousandhf.length; y++) {
                                    g = t.thousandhf[y]
                                    if ('X' == o[g]) break t
                                    u += 1 * o[g]
                                  }
                                  d = ('' + u).substr(('' + u).length - 1, 1)
                                  t.thousand_put.indexOf(d) < 0 && (s = !1)
                                }
                              if (t.hundredhf.length > 0 && '' != t.hundred_put)
                                if (1 == t.hundredhf.length) {
                                  if (t.hundred_put.indexOf(o[t.hundredhf[0]]) < 0) {
                                    s = !1
                                    continue
                                  }
                                } else {
                                  if (t.hundredhf.length > a) {
                                    s = !1
                                    continue
                                  }
                                  for (u = 0, y = 0; y < t.hundredhf.length; y++) {
                                    g = t.hundredhf[y]
                                    if ('X' == o[g]) break t
                                    u += 1 * o[g]
                                  }
                                  d = ('' + u).substr(('' + u).length - 1, 1)
                                  t.hundred_put.indexOf(d) < 0 && (s = !1)
                                }
                              if (t.tenhf.length > 0 && '' != t.ten_put)
                                if (1 == t.tenhf.length) {
                                  if (t.ten_put.indexOf(o[t.tenhf[0]]) < 0) {
                                    s = !1
                                    continue
                                  }
                                } else {
                                  if (t.tenhf.length > a) {
                                    s = !1
                                    continue
                                  }
                                  for (u = 0, y = 0; y < t.tenhf.length; y++) {
                                    g = t.tenhf[y]
                                    if ('X' == o[g]) break t
                                    u += 1 * o[g]
                                  }
                                  d = ('' + u).substr(('' + u).length - 1, 1)
                                  t.ten_put.indexOf(d) < 0 && (s = !1)
                                }
                              if (t.onehf.length > 0 && '' != t.one_put)
                                if (1 == t.onehf.length) {
                                  if (t.one_put.indexOf(o[t.onehf[0]]) < 0) {
                                    s = !1
                                    continue
                                  }
                                } else {
                                  if (t.onehf.length > a) {
                                    s = !1
                                    continue
                                  }
                                  for (u = 0, y = 0; y < t.onehf.length; y++) {
                                    g = t.onehf[y]
                                    if ('X' == o[g]) break t
                                    u += 1 * o[g]
                                  }
                                  d = ('' + u).substr(('' + u).length - 1, 1)
                                  t.one_put.indexOf(d) < 0 && (s = !1)
                                }
                              s && (c += '##' + o.join(''))
                            }
                    else if (4 == a)
                      for (var v = ['XOOOO', 'OXOOO', 'OOXOO', 'OOOXO', 'OOOOX'], O = 0; O < v.length; O++)
                        for (r = 0; r < 10; r++)
                          for (m = 0; m < 10; m++)
                            for (b = 0; b < 10; b++)
                              for (h = 0; h < 10; h++) {
                                s = !0
                                if (((o = (o = (o = (o = (o = v[O]).replace('O', r)).replace('O', m)).replace('O', b)).replace('O', h)), t.thousandhf.length > 0 && '' != t.thousand_put)) {
                                  f = X(o)
                                  var k = !1
                                  if (
                                    (t.thousandhf.forEach(function (t) {
                                      'X' == f[t] && (k = !0)
                                    }),
                                    k)
                                  ) {
                                    s = !1
                                    continue
                                  }
                                  if (1 == t.thousandhf.length) {
                                    if (t.thousand_put.indexOf(o[t.thousandhf[0]]) < 0) {
                                      s = !1
                                      continue
                                    }
                                  } else {
                                    u = 0
                                    layui.$.each(t.thousandhf, function (t, e) {
                                      u += 1 * o[e]
                                    })
                                    d = ('' + u).substr(('' + u).length - 1, 1)
                                    if (t.thousand_put.indexOf(d) < 0) {
                                      s = !1
                                      continue
                                    }
                                  }
                                }
                                if (t.hundredhf.length > 0 && '' != t.hundred_put) {
                                  ;((f = X(o)), (k = !1))
                                  if (
                                    (t.hundredhf.forEach(function (t) {
                                      'X' == f[t] && (k = !0)
                                    }),
                                    k)
                                  ) {
                                    s = !1
                                    continue
                                  }
                                  if (1 == t.thousandhf.length) {
                                    if (t.hundred_put.indexOf(o[t.hundredhf[0]]) < 0) {
                                      s = !1
                                      continue
                                    }
                                  } else {
                                    u = 0
                                    layui.$.each(t.hundredhf, function (t, e) {
                                      u += 1 * o[e]
                                    })
                                    d = ('' + u).substr(('' + u).length - 1, 1)
                                    if (t.hundred_put.indexOf(d) < 0) {
                                      s = !1
                                      continue
                                    }
                                  }
                                }
                                if (t.tenhf.length > 0 && '' != t.ten_put) {
                                  ;((f = X(o)), (k = !1))
                                  if (
                                    (t.tenhf.forEach(function (t) {
                                      'X' == f[t] && (k = !0)
                                    }),
                                    k)
                                  ) {
                                    s = !1
                                    continue
                                  }
                                  if (1 == t.tenhf.length) {
                                    if (t.ten_put.indexOf(o[t.tenhf[0]]) < 0) {
                                      s = !1
                                      continue
                                    }
                                  } else {
                                    u = 0
                                    layui.$.each(t.tenhf, function (t, e) {
                                      u += 1 * o[e]
                                    })
                                    d = ('' + u).substr(('' + u).length - 1, 1)
                                    if (t.ten_put.indexOf(d) < 0) {
                                      s = !1
                                      continue
                                    }
                                  }
                                }
                                if (t.onehf.length > 0 && '' != t.one_put) {
                                  ;((f = X(o)), (k = !1))
                                  if (
                                    (t.onehf.forEach(function (t) {
                                      'X' == f[t] && (k = !0)
                                    }),
                                    k)
                                  ) {
                                    s = !1
                                    continue
                                  }
                                  if (1 == t.onehf.length) {
                                    if (t.one_put.indexOf(o[t.onehf[0]]) < 0) {
                                      s = !1
                                      continue
                                    }
                                  } else {
                                    u = 0
                                    layui.$.each(t.onehf, function (t, e) {
                                      u += 1 * o[e]
                                    })
                                    d = ('' + u).substr(('' + u).length - 1, 1)
                                    t.one_put.indexOf(d) < 0 && (s = !1)
                                  }
                                }
                                if (t.millhf.length > 0 && '' != t.mill_put) {
                                  ;((f = X(o)), (k = !1))
                                  if (
                                    (t.millhf.forEach(function (t) {
                                      'X' == f[t] && (k = !0)
                                    }),
                                    k)
                                  ) {
                                    s = !1
                                    continue
                                  }
                                  if (1 == t.millhf.length) {
                                    if (t.mill_put.indexOf(o[t.millhf[0]]) < 0) {
                                      s = !1
                                      continue
                                    }
                                  } else {
                                    u = 0
                                    layui.$.each(t.millhf, function (t, e) {
                                      u += 1 * o[e]
                                    })
                                    d = ('' + u).substr(('' + u).length - 1, 1)
                                    t.mill_put.indexOf(d) < 0 && (s = !1)
                                  }
                                }
                                s && (c += '##' + o)
                              }
                    t = []
                    return ('' != c && '##' != c && (t = c.replace('##', '').split('##')), 'move' == i && (t = e.minus(t)), t)
                  })(t, i, l, t.hf)
                  ;((l = v), y++)
                }
                if ((null != t.npositionAdd && '' != t.npositionAdd) || (null != t.minVal && '' != t.minVal && null != t.maxVal && '' != t.maxVal)) {
                  var O = {}
                  if (((O.ipt = t.notPostionAdd), (O.min = t.minVal), (O.max = t.maxVal), l.length < 1 && y > 0)) return []
                  ;((l = s(O, i, t.npositionAdd, l)), y++)
                }
                var M = [],
                  _ = !1,
                  j = !1
                if ('' != t.allDown && null != t.allDown && '' != t.upLot && null != t.upLot) {
                  var T = u(t.upLot, i, 2, t.ps, t.positionInp),
                    N = u(t.allDown, i, 1)
                  ;((M = T), t.upLot.length < i && t.allDown.length > 0 && (M = N.intersectD(T)), (_ = !0), (j = !0))
                } else {
                  if ('' != t.allDown && null != t.allDown) ((N = u(t.allDown, i, 1)).length > 0 && ((M = N), (_ = !0)), (j = !0))
                  if ('' != t.upLot && null != t.upLot) ((T = u(t.upLot, i, 2, t.ps, t.positionInp)).length > 0 && ((M = T), (_ = !0)), (j = !0))
                }
                if (null != t.remove && '' != t.remove) {
                  var S = o(t.remove, i)
                  ;(_ ? (M = S.intersectD(M)) : j ? ((M = S.intersectD(M)), (_ = !0)) : ((M = S), (_ = !0)), (j = !0))
                }
                if (null != t.ridePos && t.ridePos.length > 0) {
                  var A = (function (t, e) {
                    for (var a = [], n = '', i = X('KKKKK'), l = 0; l < t.length; l++) i[t[l]] = 'X'
                    if (((i = i.join('')), t.length == 5 - e && 2 == e)) {
                      for (l = 0; l <= 9; l++)
                        for (var r = 0; r <= 9; r++) {
                          n += '##' + i.replace('K', l).replace('K', r)
                        }
                      return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
                    }
                    if (1 == t.length && 2 == e) {
                      for (var o = [], s = 0; s < i.length; s++)
                        for (var u = 0; u < i.length; u++) {
                          'X' != (p = X(i))[s] && 'X' != p[u] && s != u && ((p[s] = 'X'), (p[u] = 'X'), o.push(p.join('')))
                        }
                      for (s = 0; s < o.length; s++)
                        for (l = 0; l <= 9; l++)
                          for (r = 0; r <= 9; r++) {
                            n += '##' + o[s].replace('K', l).replace('K', r)
                          }
                      return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
                    }
                    if (2 == t.length && 2 == e) {
                      for (o = [], s = 0; s < i.length; s++) {
                        'X' != (p = X(i))[s] && ((p[s] = 'X'), o.push(p.join('')))
                      }
                      for (s = 0; s < o.length; s++)
                        for (l = 0; l <= 9; l++)
                          for (r = 0; r <= 9; r++)
                            for (u = 0; u <= 9; u++) {
                              n += '##' + o[s].replace('K', l).replace('K', r).replace('K', u)
                            }
                      return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
                    }
                    if (1 == t.length && 3 == e) {
                      for (a = [], o = [], s = 0; s < i.length; s++) {
                        var p
                        'X' != (p = X(i))[s] && ((p[s] = 'X'), o.push(p.join('')))
                      }
                      for (s = 0; s < o.length; s++)
                        for (l = 0; l <= 9; l++)
                          for (u = 0; u <= 9; u++)
                            for (r = 0; r <= 9; r++) {
                              n += '##' + o[s].replace('K', l).replace('K', u).replace('K', r)
                            }
                      return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
                    }
                    if (2 == t.length && 3 == e) {
                      for (o = [], l = 0; l <= 9; l++)
                        for (r = 0; r <= 9; r++)
                          for (u = 0; u <= 9; u++) {
                            n += '##' + i.replace('K', l).replace('K', r).replace('K', u)
                          }
                      return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
                    }
                    if (1 == t.length && 4 == e) {
                      for (l = 0; l <= 9; l++)
                        for (r = 0; r <= 9; r++)
                          for (u = 0; u <= 9; u++)
                            for (var d = 0; d <= 9; d++) {
                              n += '##' + i.replace('K', l).replace('K', r).replace('K', u).replace('K', d)
                            }
                      return ('' != n && '##' != n && (a = n.replace('##', '').split('##')), a)
                    }
                    return []
                  })(t.ridePos, i)
                  _ ? (M = A.intersectD(M)) : j ? ((M = M.intersectD(A)), (_ = !0)) : ((M = A), (_ = !0))
                }
                if (_) {
                  if (l.length < 1 && y > 0) return []
                  ;((l = l.length > 0 ? l.intersectD(M, l) : M), y++)
                }
                if (null != t.double || null != t.ddouble || null != t.Tdouble || null != t.Fdouble) {
                  if (l.length < 1 && y > 0) return []
                  var C = (function (t, a, n, i, l, r) {
                    var o = [],
                      s = 0
                    null != t && ((r = m(l, r, t, s)), s++)
                    null != a &&
                      ((r = (function (t, a, n, i) {
                        if (null != a && a.length > 0) {
                          for (var l = [], r = 0; r < a.length; r++) {
                            var o = x(X(a[r].replace(/[^0-9]/g, '')))
                            if (1 == o.length) 'move' == n || l.push(a[r])
                            else if (2 == o.length) {
                              for (var s = !1, u = 0; u < o.length; u++)
                                if (2 == w(a[r], o[u])) {
                                  s = !0
                                  break
                                }
                              'move' == n ? s || l.push(a[r]) : s && l.push(a[r])
                            } else 'move' == n && l.push(a[r])
                          }
                          return l
                        }
                        var p = []
                        if (0 == i) {
                          var d = ''
                          if (4 == t) {
                            var c = ['KKOOX', 'KKOXO', 'KKXOO', 'KXOOK', 'KXKOO', 'KXOKO', 'OOKKX', 'OOKXK', 'OOXKK', 'OXOKK', 'OXKOK', 'OXKKO', 'XKKOO', 'XOOKK']
                            for (u = 0; u < c.length; u++)
                              for (r = 0; r <= 9; r++)
                                for (var f = 0; f <= 9; f++) {
                                  var h = c[u].replace(/O/g, r)
                                  ;((h = h.replace(/K/g, f)), d.indexOf(h) < 0 && (d += '##' + h))
                                }
                          }
                          '' != d && '##' != d && (p = d.replace('##', '').split('##'))
                        }
                        return ((p = x(p)), 'move' == n && (p = e.minus(p)), p)
                      })(l, r, a, s)),
                      s++)
                    null != n &&
                      ((r = (function (t, a, n, i) {
                        if (null != a && a.length > 0) {
                          for (var l = [], r = 0; r < a.length; r++) {
                            for (var o = X(a[r].replace(/[^0-9]/g, '')), s = !1, u = 0; u < o.length; u++)
                              if (w(a[r], o[u]) >= 3) {
                                s = !0
                                break
                              }
                            'move' == n ? s || l.push(a[r]) : s && l.push(a[r])
                          }
                          return l
                        }
                        var p = []
                        if (0 == i) {
                          var d = ''
                          if (3 == t) {
                            var c = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO']
                            for (r = 0; r < c.length; r++)
                              for (var f = 0; f <= 9; f++) {
                                d += '##' + c[r].replace(/O/g, f)
                              }
                          } else if (4 == t) {
                            c = ['OOOKX', 'OOKOX', 'OKOOX', 'OOOXK', 'OOXOK', 'OXOOK', 'XOOOK', 'XKOOO', 'XOKOO', 'XOOKO', 'KXOOO', 'KOXOO', 'KOOXO', 'KOOOX']
                            for (u = 0; u < c.length; u++)
                              for (r = 0; r <= 9; r++)
                                for (f = 0; f <= 9; f++) {
                                  d += '##' + c[u].replace(/O/g, r).replace(/K/g, f)
                                }
                          }
                          '' != d && '##' != d && (p = d.replace('##', '').split('##'))
                        }
                        return ('move' == n && (p = e.minus(p)), p)
                      })(l, r, n, s)),
                      s++)
                    null != i &&
                      ((r = (function (t, a, n, i) {
                        var l = ['OXXXX', 'XOXXX', 'XXOXX', 'XXXOX', 'XXXXO']
                        if (null != a && a.length > 0) {
                          var r = []
                          if (4 == t) for (var o = 0; o < l.length; o++) for (var s = l[o], u = 0; u <= 9; u++) r.push(s.replace(/X/g, u).replace('O', 'X'))
                          return (r = 'move' == n ? a.minus(r) : a.intersectD(r))
                        }
                        r = []
                        if (0 == i && 4 == t) for (o = 0; o < l.length; o++) for (s = l[o], u = 0; u <= 9; u++) r.push(s.replace(/X/g, u).replace('O', 'X'))
                        return ('move' == n && (r = e.minus(r)), r)
                      })(l, r, i, s)),
                      s++)
                    return ((o = x(r)), o)
                  })(t.double, t.ddouble, t.Tdouble, t.Fdouble, i, l)
                  ;((l = C), y++)
                }
                if (null != t.borther || null != t.Tborther || null != t.Fborther) {
                  if (l.length < 1 && y > 0) return []
                  var $ = (function (t, a, n, i, l) {
                    var r = [],
                      o = 0
                    null != t && ((l = h(i, l, t, o)), o++)
                    null != a &&
                      ((l = (function (t, a, n, i) {
                        if (null != a && a.length > 0) {
                          for (var l = [], r = 0; r < a.length; r++)
                            if (a[r].indexOf('X') >= 0 && w(a[r], 'X') > 1) {
                              var o = X(a[r].replace(/[X]/g, '')).sort().join('')
                              ;(console.error(o), (s = '012##123##234##345##456##567##678##789##890##019').indexOf(o) >= 0 ? 'move' != n && l.push(a[r]) : 'move' == n && l.push(a[r]))
                            } else {
                              o = X(a[r].replace('X', ''))
                              var s = '012##123##234##345##456##567##678##789##089##019',
                                u = !1
                              t: for (var p = 0; p < o.length; p++)
                                for (var d = p + 1; d < o.length; d++)
                                  for (var c = d + 1; c < o.length; c++) {
                                    var f = [o[p], o[d], o[c]].sort().join('')
                                    if (s.indexOf(f) >= 0) {
                                      u = !0
                                      break t
                                    }
                                  }
                              'move' == n ? u || l.push(a[r]) : u && l.push(a[r])
                            }
                          return l
                        }
                        console.error('<<<<<bs.............>>>>>>')
                        var h = [],
                          m = ''
                        if (0 == i) {
                          o = ['012', '123', '234', '345', '456', '567', '678', '789', '089', '019']
                          var y = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO']
                          if (3 == t)
                            for (p = 0; p < y.length; p++)
                              for (r = 0; r < o.length; r++) {
                                f = X(o[r])
                                ;((m += '##' + y[p].replace('O', f[0]).replace('O', f[1]).replace('O', f[2])),
                                  (m += '##' + y[p].replace('O', f[0]).replace('O', f[2]).replace('O', f[1])),
                                  (m += '##' + y[p].replace('O', f[1]).replace('O', f[0]).replace('O', f[2])),
                                  (m += '##' + y[p].replace('O', f[1]).replace('O', f[2]).replace('O', f[0])),
                                  (m += '##' + y[p].replace('O', f[2]).replace('O', f[0]).replace('O', f[1])),
                                  (m += '##' + y[p].replace('O', f[2]).replace('O', f[1]).replace('O', f[0])))
                              }
                          else if (4 == t)
                            for (p = 0; p < y.length; p++)
                              for (r = 0; r < o.length; r++)
                                for (c = 0; c <= 9; c++) {
                                  f = X(o[r])
                                  ;((m += '##' + y[p].replace('O', f[0]).replace('O', f[1]).replace('O', f[2]).replace('X', c)),
                                    (m += '##' + y[p].replace('O', f[0]).replace('O', f[2]).replace('O', f[1]).replace('X', c)),
                                    (m += '##' + y[p].replace('O', f[1]).replace('O', f[0]).replace('O', f[2]).replace('X', c)),
                                    (m += '##' + y[p].replace('O', f[1]).replace('O', f[2]).replace('O', f[0]).replace('X', c)),
                                    (m += '##' + y[p].replace('O', f[2]).replace('O', f[0]).replace('O', f[1]).replace('X', c)),
                                    (m += '##' + y[p].replace('O', f[2]).replace('O', f[1]).replace('O', f[0]).replace('X', c)))
                                }
                          '' != m && '##' != m && (h = m.replace('##', '').split('##'))
                        }
                        return ('move' == n && (h = e.minus(h)), h)
                      })(i, l, a, o)),
                      o++)
                    null != n &&
                      ((l = (function (t, a, n, i) {
                        if (null != a && a.length > 0) {
                          for (var l = [], r = 0; r < a.length; r++) {
                            var o = '0123##1234##2345##3456##4567##5678##6789##0789##0189##0129',
                              s = X(a[r].replace(/X/g, '')).sort().join('')
                            o.indexOf(s) >= 0 ? 'move' != n && l.push(a[r]) : 'move' == n && l.push(a[r])
                          }
                          return l
                        }
                        var u = [],
                          p = ''
                        if (0 == i) {
                          s = ['0123', '1234', '2345', '3456', '4567', '5678', '6789', '0789', '0189', '0129']
                          if (4 == t)
                            for (var d = ['XOOOO', 'OXOOO', 'OOXOO', 'OOOXO', 'OOOOX'], c = 0; c < d.length; c++)
                              for (r = 0; r <= 9; r++)
                                for (var f = 0; f <= 9; f++)
                                  for (var h = 0; h <= 9; h++)
                                    for (var m = 0; m <= 9; m++) {
                                      var y = d[c],
                                        g = (y = (y = (y = (y = y.replace('O', r)).replace('O', f)).replace('O', h)).replace('O', m)).replace('X', '')
                                      if (layui.$.inArray(g, s) >= 0) p += '##' + y
                                    }
                          '' != p && '##' != p && (u = p.replace('##', '').split('##'))
                        }
                        return ('move' == n && (u = e.minus(u)), u)
                      })(i, l, n, o)),
                      o++)
                    return ((r = x(l)), r)
                  })(t.borther, t.Tborther, t.Fborther, i, l)
                  ;((l = $), y++)
                }
                if ('move' == t.opposition || 'get' == t.opposition || '' != t.opposition_one || '' != t.opposition_two || '' != t.opposition_three) {
                  if (l.length < 1 && y > 0) return []
                  var K = (function (t, a, n, i) {
                    if (n.length > 0) {
                      var l = []
                      if (t.opposition_one.length > 0 || t.opposition_two.length > 0 || t.opposition_three.length > 0) {
                        var r = d(X(t.opposition_one), a),
                          o = d(X(t.opposition_two), a),
                          s = d(X(t.opposition_three), a),
                          u = k(r, o)
                        ;((u = k(u, s)), (l = 'move' == i ? n.minus(u) : u.intersectD(n)))
                      } else for (var p = 0; p < n.length; p++) for (var c = X(n[p].replace(/[^0-9]/g, '')), f = 0; f < c.length; f++) for (var h = f + 1; h < c.length; h++) 5 == Math.abs(1 * c[h] - 1 * c[f]) ? 'move' != i && l.push(n[p]) : 'move' == i && l.push(n[p])
                      return l
                    }
                    var m = [],
                      y = ''
                    if (t.opposition_one.length > 0 || t.opposition_two.length > 0 || t.opposition_three.length > 0) {
                      ;((r = d(X(t.opposition_one), a)), (o = d(X(t.opposition_two), a)), (s = d(X(t.opposition_three), a)), (u = k(r, o)))
                      m = u = k(u, s)
                    } else if (2 == a) {
                      var g = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO']
                      for (p = 0; p < g.length; p++)
                        for (h = 0; h <= 9; h++)
                          for (f = 0; f <= 9; f++) {
                            if (5 == Math.abs(h - f)) y += '##' + g[p].replace('O', h).replace('O', f)
                          }
                    } else if (3 == a)
                      for (g = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], p = 0; p < g.length; p++)
                        for (h = 0; h <= 9; h++)
                          for (f = 0; f <= 9; f++)
                            for (var b = 0; b <= 9; b++) {
                              if (5 == Math.abs(h - f) || 5 == Math.abs(b - f) || 5 == Math.abs(h - b)) y += '##' + g[p].replace('O', h).replace('O', f).replace('O', b)
                            }
                    else if (4 == a) {
                      g = ['XOOOO', 'OXOOO', 'OOXOO', 'OOOXO', 'OOOOX']
                      for (var v = 0; v < g.length; v++)
                        for (p = 0; p <= 9; p++)
                          for (f = 0; f <= 9; f++)
                            for (h = 0; h <= 9; h++)
                              for (b = 0; b <= 9; b++)
                                if (5 == Math.abs(h - f) || 5 == Math.abs(b - f) || 5 == Math.abs(h - b) || 5 == Math.abs(h - p) || 5 == Math.abs(b - p) || 5 == Math.abs(p - f)) {
                                  var O = g[v]
                                  y += '##' + (O = (O = (O = (O = O.replace('O', p)).replace('O', f)).replace('O', b)).replace('O', h))
                                }
                    }
                    return ('' != y && '##' != y && (m = y.replace('##', '').split('##')), 'move' == i && (m = e.minus(m)), m)
                  })(t, i, l, t.opposition)
                  ;((l = K), (n = K), y++)
                }
                if ('move' == t.odds || 'get' == t.odds) {
                  if (l.length < 1 && y > 0) return []
                  ;((l = c(t.odd, i, 'odd', l, t.odds)), y++)
                }
                if ('move' == t.evens || 'get' == t.evens) {
                  if (l.length < 1 && y > 0) return []
                  ;((l = c(t.even, i, 'evens', l, t.evens)), y++)
                }
                if ('move' == t.posHav || 'get' == t.posHav || '' != t.inp_posiHav || '' != t.inp_posiRepeat) {
                  if (('move' != t.posHav && 'get' != t.posHav && (t.posHav = 'get'), '' != t.inp_posiHav)) {
                    if (l.length < 1 && y > 0) return []
                    ;((l = (function (t, a, n, i) {
                      if (n.length > 0) {
                        for (var l = [], r = n.length - 1; r >= 0; r--) {
                          for (var o = X(t), s = !1, u = 0; u < o.length; u++)
                            if (n[r].indexOf(o[u]) >= 0) {
                              s = !0
                              break
                            }
                          'move' == i ? s || l.push(n[r]) : s && l.push(n[r])
                        }
                        return l
                      }
                      var p = [],
                        d = ''
                      if (2 == a) {
                        var c = ['OOXXX', 'OXOXX', 'OXXOX', 'OXXXO', 'XXOOX', 'XXOXO', 'XXXOO', 'XOXOX', 'XOOXX', 'XOXXO']
                        for (r = 0; r < c.length; r++)
                          for (var f = 0; f <= 9; f++)
                            for (u = 0; u <= 9; u++) {
                              if (t.indexOf(f) >= 0 || t.indexOf(u) >= 0) d += '##' + c[r].replace('O', f).replace('O', u)
                            }
                      } else if (3 == a)
                        for (c = ['OOOXX', 'OOXOX', 'OXOOX', 'XOOOX', 'XXOOO', 'OXXOO', 'OOXXO', 'XOXOO', 'XOOXO', 'OXOXO'], r = 0; r < c.length; r++)
                          for (f = 0; f <= 9; f++)
                            for (u = 0; u <= 9; u++)
                              for (var h = 0; h <= 9; h++) {
                                if (t.indexOf(f) >= 0 || t.indexOf(u) >= 0 || t.indexOf(h) >= 0) d += '##' + c[r].replace('O', f).replace('O', u).replace('O', h)
                              }
                      else if (4 == a) {
                        c = ['XOOOO', 'OXOOO', 'OOXOO', 'OOOXO', 'OOOOX']
                        for (var m = 0; m < c.length; m++)
                          for (r = 0; r <= 9; r++)
                            for (u = 0; u <= 9; u++)
                              for (f = 0; f <= 9; f++)
                                for (h = 0; h <= 9; h++)
                                  if (t.indexOf(r) >= 0 || t.indexOf(u) >= 0 || t.indexOf(f) >= 0 || t.indexOf(h) >= 0) {
                                    var y = c[m]
                                    d += '##' + (y = (y = (y = (y = y.replace('O', r)).replace('O', u)).replace('O', f)).replace('O', h))
                                  }
                      }
                      return ('' != d && '##' != d && (p = d.replace('##', '').split('##')), 'move' == i && (p = e.minus(p)), p)
                    })(t.inp_posiHav, i, l, t.posHav)),
                      y++)
                  }
                  if ('' != t.inp_posiRepeat) {
                    if (l.length < 1 && y > 0) return []
                    ;((l = f(t.inp_posiRepeat, i, l, t.posHav)), y++)
                  }
                } else if ('' != t.inp_posiRepeat) {
                  if (l.length < 1 && y > 0) return []
                  l = f(t.inp_posiRepeat, i, l, t.posHav)
                }
                return x(l)
              })(t, r.list, i)),
            l
          )
        },
        allNumType: p,
        peiArr: a,
        npHfRule: s,
        allTrun: u,
        removeList: o,
        double: m,
        twoBrother: h,
        oddType: c
      }))
  }),
  layui.define(function (t) {
    var e = layui.jquery,
      a = layui.laytpl,
      n = layui.utils,
      i = layui.form
    t('modifyPws', {
      render: function () {
        ;(a(
          '<div class="panel panel-success"><div class="panel-heading"><div class="panel-title">修改密码</div></div><div class="" style="position: absolute; left: 9999999px"><input type="text" name="" maxlength="16" autocomplete="off" class="" /><input type="password" name="" maxlength="16" autocomplete="off" class="" /></div><div class="panel-body pd0"><form class="layui-form"><table class="table table-bd mg0" border="1"><tbody><tr><td colspan="2" class="text-left"><p class="mg5">"密码"需包含两个以上英文字母和数字等符号、不能包含4个连续"相同字符"或"顺序数字"如：aaa、1234、4321。</p><p class="text-red mg5">特别注意：不要重复使用旧密码</p></td></tr><tr><td width="10%" class="text-left pdl15"><b>原密码：</b></td><td class="text-left"><div class="layui-input-inline"><input type="password" name="paramMap.oldPwd" required lay-verify="required" id="old" placeholder="请输入原密码" autocomplete="off" class="layui-input" /></div></td></tr><tr><td class="text-left pdl15"><b>新密码：</b></td><td class="text-left"><div class="layui-input-inline"><input type="password" name="paramMap.newPwd" required lay-verify="required|minLen|sameOld" id="new" placeholder="请输入新密码" autocomplete="off" class="layui-input" /></div></td></tr><tr><td class="text-left pdl15"><b>确认密码：</b></td><td class="text-left"><div class="layui-input-inline"><input type="password" name="paramMap.confirmPwd" lay-verify="required|minLen|comfirm" id="cofim" placeholder="请输入确认密码" autocomplete="off" class="layui-input" /></div></td></tr><tr><td colspan="2"><button class="pd5" lay-submit="" lay-filter="submitBtn">提交</button></td></tr></tbody></table></form></div></div>'
        ).render({}, function (t) {
          layui.main.container.content.html(t)
        }),
          i.on('submit(submitBtn)', function (t) {
            var e = {
              oldPwd: t.field['paramMap.oldPwd'],
              newPwd: t.field['paramMap.newPwd'],
              confirmPwd: t.field['paramMap.confirmPwd']
            }
            return (
              n.post('member/myMembersInfo/updatePwd', e, function (t) {
                200 === t.code
                  ? layui.utils.success('密码修改成功，请重新登录', null, function () {
                      ;(sessionStorage && sessionStorage.clear(), (window.location.href = '/'))
                    })
                  : layui.utils.msg(t.msg)
              }),
              !1
            )
          }),
          i.verify({
            sameOld: function (t, a) {
              if (e('#old').val() == t) return '新密码和旧密码不能相同'
            },
            comfirm: function (t, a) {
              if (t != e('#new').val()) return '密码和确认密码不一致'
            },
            minLen: function (t, a) {
              if (e.trim(t).length < 6) return '密码或确认密码最小为6个字符'
            }
          }))
      }
    })
  }),
  layui.define(function (t) {
    var e = {
      1: '一定位',
      2: '二定位',
      3: '三定位',
      8: '大小单双龙虎和',
      9: '番摊'
    }
    function a() {
      layui.utils.post('member/myMembersInfo/detail', void 0, function (t) {
        ;((t.data.types = e),
          layui
            .laytpl(
              '<form class="layui-form"><div class="clearfix"><table class="table table-bd pull-left" border="1" style="width: 49%;"><thead><tr class="bgcolor-success"><th colspan="4">会员资料</th></tr></thead><tbody><tr><td>账号：</td><td>{{ d.userName }}</td><td>安全退码：</td><td><input type="checkbox" name="paramMap.safeReturnCode" {{d.safeReturnCode==1?\'checked\':\'\'}} lay-skin="primary" title="详细说明"></td></tr><tr><td>信用额度：</td><td>{{ layui.main.container.curr.text() }}</td><td>打印标题：</td><td><div class="layui-input-inline"><input type="text" maxlength="16" name="paramMap.printtitle" value="{{d.printTitle || \'\'}}" class="layui-input"></div></td></tr></tbody></table><table class="table table-bd pull-right" border="1" style="width: 50%;"><thead><tr class="bgcolor-success"><th colspan="6">录码模式</th></tr></thead><tbody><tr><td>自动：</td><td><input type="radio" name="paramMap.enterflag" {{d.enterFlag==1?\'checked\':\'\'}} value="1" title=" "></td><td>小票打印：</td><td><input type="radio" name="paramMap.printsetting" {{d.printSetting==1?\'checked\':\'\'}} value="1" title=" "></td><td>实际赔率：</td><td><input type="radio" name="paramMap.oddstype" {{d.oddsType==1?\'checked\':\'\'}} value="1" title=" "></td></tr><tr><td>回车：</td><td><input type="radio" name="paramMap.enterflag" {{d.enterFlag==2?\'checked\':\'\'}} value="2" title=" "></td><td>显示彩种：</td><td><input type="radio" name="paramMap.printsetting" {{d.printSetting==2?\'checked\':\'\'}} value="2" title=" "></td><td>转换赔率：</td><td><input type="radio" name="paramMap.oddstype" {{d.oddsType==2?\'checked\':\'\'}} value="2" title=" "></td></tr></tbody></table></div><div class="text-center mgb10"><button type="button" lay-submit="" lay-filter="submitBtn" class="pd5">提 交</button></div></form><table class="table table-bd table-hover" border="1" width="100%"><thead><tr class="bgcolor-success"><th>类别</th><th>单注下限</th><th>递增基数</th><th>赔率上限(多个用/分开)</th><th>单注上限</th><th>单项上限</th><th>赚水（<input type="checkbox" id="backrate_all" lay-skin="primary">单项调水）</th><th>赔率</th></tr></thead><tbody>{{# var item,prevBt,odds; }}{{# for(var i = 0; i < d.memberOddsInfoVoList.length; i++){ }}{{# item=d.memberOddsInfoVoList[i]; }}{{# odds = layui.utils.numFormat((item.oddsMax-item.oddsPrice*item.memberBackwaterRate),4,false); }}{{# if(/^([1-9])$/.test(item.locationType) && item.locationType!=prevBt){ }}{{# prevBt=item.locationType; }}<tr class="bgcolor-fff0d9"><td colspan="8" class="text-left pdl15"><b>{{ d.types[item.locationType] }}</b></td></tr>{{# } }}<tr><td>{{ item.name }}</td><td><div class="layui-input-inline">{{ item.betMin }}</div></td><td><div class="layui-input-inline">{{ item.increaseBase }}</div></td><td><div class="layui-input-inline">{{ layui.utils.numFormat(item.oddsMax,4,false) }}</div></td><td><div class="layui-input-inline">{{ item.singleBetMax }}</div></td><td><div class="layui-input-inline">{{ item.singleMax }}</div></td><td><div class="layui-input-inline"><select class="set-w90" lay-filter="backrate" name="backrate"data-type="{{ item.locationType.toString().charAt(0) }}"data-id="{{ item.moiId }}"data-stype="{{ item.smallType }}"data-price="{{ item.oddsPrice }}"data-max="{{ item.oddsMax }}"data-df="{{ item.memberBackwaterRate }}"><option value="{{ item.memberBackwaterRate || \'\' }}">{{ item.memberBackwaterRate }}</option></select></div></td><td><div class="layui-input-inline"><select class="set-w90" lay-filter="oddsself" name="oddsself"data-type="{{ item.locationType.toString().charAt(0) }}"data-max="{{ item.oddsMax }}"data-price="{{ item.oddsPrice }}"data-df="{{ odds }}"><option value="{{ odds || \'\' }}">{{ odds }}</option></select></div></td></tr>{{# } }}</tbody></table>'
            )
            .render(t.data, function (t) {
              ;(layui.main.container.content.html(t),
                layui.form.render(),
                setTimeout(function () {
                  var t,
                    e,
                    a,
                    n,
                    i = layui.$('select[name=backrate]')
                  ;(layui.each(layui.$('select[name=oddsself]'), function (l, r) {
                    i[l].getAttribute('data-type')
                    var o = i[l].getAttribute('data-max'),
                      s = i[l].getAttribute('data-price'),
                      u = (r = layui.$(r)).data('df'),
                      p = i[l].getAttribute('data-df')
                    ;((a = []), (t = []))
                    for (var d = 0; d < 0.201; d += 0.001)
                      ((n = layui.utils.numFormat(d, 3, !1)), a.push('<option value="' + n + '" ' + (p == n ? 'selected' : '') + '>' + n + '</option>'), (e = layui.utils.numFormat(o - s * n, 4, !1)), t.push('<option value=' + n + ' ' + (u == e ? 'selected' : '') + ' >' + e + '</option>'))
                    ;(r.html(t.join('')), layui.$(i[l]).html(a.join('')))
                  }),
                    layui.$('select[name=backrate]').change(function (t) {
                      if ((t.preventDefault(), layui.$('#backrate_all').is(':checked'))) layui.$(this).closest('td').next().find('select').val(this.value)
                      else {
                        var e = this.getAttribute('data-type'),
                          a = this.value
                        layui.each(layui.$('select[name=backrate][data-type=' + e + ']'), function (t, e) {
                          ;((e.value = a), layui.$(this).closest('td').next().find('select').val(a))
                        })
                      }
                    }),
                    layui.$('select[name=oddsself]').change(function (t) {
                      if ((t.preventDefault(), layui.$('#backrate_all').is(':checked'))) layui.$(this).closest('td').prev().find('select').val(this.value)
                      else {
                        var e = this.getAttribute('data-type'),
                          a = this.value
                        layui.each(layui.$('select[name=oddsself][data-type=' + e + ']'), function (t, e) {
                          ;((e.value = a), layui.$(this).closest('td').prev().find('select').val(a))
                        })
                      }
                    }))
                }, 100),
                layui.form.on('submit(submitBtn)', function (t) {
                  t.field['paramMap.safeReturnCode'] = 'on' == t.field['paramMap.safeReturnCode'] ? 1 : 0
                  var e,
                    n = [],
                    i = !0
                  return (
                    layui.each(layui.$('select[name=backrate]'), function (t, a) {
                      if (a.getAttribute('data-df') - a.value != 0) {
                        if (!(0 <= a.value && a.value <= 0.2)) return (layui.utils.msg('赔率设置有误！'), (i = !1), !1)
                        e = a.getAttribute('data-id').split(',')
                        for (var l = 0; l < e.length; l++)
                          n.push({
                            moiId: +e[l],
                            smallType: +a.getAttribute('data-stype'),
                            memberBackwaterRate: a.value
                          })
                      }
                    }),
                    i &&
                      ((t.field.brss = n),
                      (function (t) {
                        console.log(t['paramMap.safeReturnCode'])
                        var e = {
                          safeReturnCode: t['paramMap.safeReturnCode'],
                          oddsType: t['paramMap.oddstype'],
                          enterFlag: t['paramMap.enterflag'],
                          printSetting: t['paramMap.printsetting'],
                          printTitle: t['paramMap.printtitle'],
                          memberOddsInfoVoList: t.brss
                        }
                        layui.utils.post('member/myMembersInfo/update', e, function (t) {
                          ;(layui.utils.success('修改成功'), a())
                        })
                      })(t.field)),
                    !1
                  )
                }))
            }))
      })
    }
    t('memberInfo', {
      render: a
    })
  }),
  layui.define(function (t) {
    var e =
      '{{# layui.each(d.list,function(index,item){ }}<tr class="{{item.opType==25?\'row-red bgcolor-gray\':\'\'}}"><td class="">{{index+1}}</td><td class="">{{item.stageNo}}</td><td class="">{{item.opDate}}</td><td class="">{{item.opIp}}</td><td class="">{{d.logTypes[item.opType]}}</td><td class="text-left">{{item.content}}</td></tr>{{# }); }}{{# if(d.list.length==0){ }}<tr><td colspan="6">暂时没有数据</td></tr>{{# }}}'
    t('myLog', {
      render: function t(a, n) {
        a = a || {}
        var i = layui.utils.getMonthDay(!0).join(''),
          l = layui.utils.getDate().replace(/-/g, ''),
          r = {
            current: a['paramMap.pageNum'] || 1,
            size: a['paramMap.pageSize'] || 20,
            stage: a['paramMap.lttnum'] || l,
            opType: a['paramMap.type'] || void 0,
            stageNo: a['paramMap.num'] || void 0
          }
        layui.utils.post('member/logs/MyOperation', r, function (l) {
          var o = {}
          ;((o.list = l.data.row),
            (o.dateListStr = i),
            (o.lttTimeListStr = l.data.stageNos.map(function (t) {
              return '<option value="'.concat(t, '">').concat(t, '</option>')
            })),
            (o.logTypes = {
              0: '全部',
              1: '登录',
              2: '操作',
              6: '快选',
              7: '回水',
              8: '中奖',
              9: '退码',
              11: '充值',
              12: '充值',
              13: '充值',
              14: '充值',
              16: '一字定下注',
              17: '二字定下注',
              18: '快打下注',
              19: '快译下注',
              20: 'txt导入下注',
              21: '手动追号',
              22: '自动追号',
              25: '登录失败',
              26: '和盘',
              27: '两面盘下注',
              28: '番摊下注'
            }),
            n ||
              layui
                .laytpl(
                  '<form class="layui-form"><div class="panel panel-success"><div class="panel-heading"><div class="panel-title">检索条件</div></div><div class="panel-body"><div class="layui-inline"><label class="layui-form-label">类型：</label><div class="layui-input-inline set-w120"><select id="type"><option value="0">全部</option><option value="1">登录</option><option value="2">操作</option><option value="6">快选</option><option value="7">回水</option><option value="8">中奖</option><option value="9">退码</option><option value="12">充值</option><option value="14">提现</option><option value="16">一字定下注</option><option value="17">二字定下注</option><option value="18">快打下注</option><option value="19">快译下注</option><option value="20">txt导入下注</option><option value="21">手动追号</option><option value="22">自动追号</option><option value="23">追号结果</option><option value="25">登陆失败</option><option value="26">和盘</option><option value="27">两面盘下注</option><option value="28">番摊</option></select></div></div><div class="layui-inline"><label class="layui-form-label">日期：</label><div class="layui-input-inline set-w130  layui-form"><select id="j-lttnum">{{- d.dateListStr }}</select></div></div><div class="layui-inline"><label class="layui-form-label">期号：</label><div class="layui-input-inline set-w150 layui-form"><select id="j-ltttime"><option value="all">全部</option>{{- d.lttTimeListStr }}</select></div></div><button id="submitBtn" lay-submit="" lay-filter="submitBtn" class="btn btn-bg mgl15">&nbsp;查询</button></div></div></form><div class="mgt10"></div><table class="table table-bd mg0 table-hover"><thead class="bgcolor-success"><tr><th width="3%">序号</th><th width="8%">期号</th><th width="13%">时间</th><th width="10%">IP</th><th width="8%">类型</th><th>日志</th></tr></thead><tbody id="cd_tbody"></tbody></table><div class="bg-white clearfix pdl15 pdr15"><div id="page" class="pull-right"></div></div>'
                )
                .render(o, function (e) {
                  ;(layui.main.container.content.html(e),
                    layui.form.render('select'),
                    layui.form.on('submit(submitBtn)', function (e) {
                      var a = layui.$('#j-lttnum').val(),
                        n = layui.$('#j-ltttime').val(),
                        i = layui.$('#type').val()
                      return ((e.field['paramMap.lttnum'] = a), 'all' != n && (e.field['paramMap.num'] = n), 0 != i && (e.field['paramMap.type'] = i), t(e.field, !0), !1)
                    }))
                }),
            (function (t) {
              layui.laytpl(e).render(t, function (t) {
                layui.$('#cd_tbody').html(t)
              })
            })(o),
            layui.laypage.render({
              elem: 'page',
              curr: r.current,
              count: l.data.rowCount,
              limit: r.size,
              limits: [10, 20, 30, 50, 100, 200],
              layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
              jump: function (e, n) {
                n || ((a['paramMap.pageNum'] = e.curr), (a['paramMap.pageSize'] = e.limit), (a['paramMap.lttnum'] = layui.$('#j-lttnum').val()), 0 != layui.$('#type').val() && (o.field['paramMap.type'] = layui.$('#type').val()), t(a, !0))
              }
            }))
        })
      }
    })
  }),
  layui.define(function (t) {
    var e =
        '{{# var idx=0 }}{{# for( var i = 0, bt = 0,j = d.rows.length;i < j;i++){ }}{{# var bt=d.rows[i].bt,code=d.rows[i].code }}<tr class="bgcolor-ffffc4"><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th></tr>{{# var bool=(bt==d.rows[i].bt); }}{{# if(bt!=d.rows[i].bt || i>=j){ return false } }}{{# idx=0; }}{{# for(var k = i;k < d.rows.length;k++){ }}{{# if(code==d.rows[k].code){ }}{{# if(idx==0) { }}<tr><td><b> {{d.rows[k].num}} </b></td><td>{{layui.utils.numFormat(d.rows[k].odds,2)}}{{# i++;idx++;}}</td>{{# }else if(idx%5==0){ }}</tr><tr><td><b> {{d.rows[k].num}} </b></td><td>{{ layui.utils.numFormat(d.rows[k].odds,2) }}{{# i++; idx++; }}</td>{{# }else{ }}<td><b> {{d.rows[k].num}}</b></td><td>{{ layui.utils.numFormat(d.rows[k].odds,2) }}{{# i++; idx++;}}</td>{{# } }}{{# }else{ }}{{# if(idx%5!=0){ }}{{# for(var l=0;l<5-(idx%5);l++){ }}<td><b></b></td><td></td>{{# } }}{{# } }}</tr>{{# idx=0;}}{{# continue; }}{{# } }}{{# if(idx!=0 && i==d.rows.length ){ }}{{# if(idx%5!=0){ }}{{# for(var l=0;l<5-(idx%5);l++){ }}<td><b></b></td><td></td>{{# } }}{{# } }}</tr>{{# idx=0;}}{{# } }}{{# } }}{{# } }}{{# if(d.rows.length==0){ }}<tr><td colspan="10">没有赔率变动记录</td></tr>{{# } }}',
      a = layui.jquery,
      n = [
        {},
        {
          10: '口XX',
          11: 'X口X',
          12: 'XX口'
        },
        {
          20: '口口X',
          21: '口X口',
          22: 'X口口'
        },
        {
          30: '口口口'
        },
        {},
        {},
        {
          6: '二字现'
        },
        {
          7: '三字现'
        },
        {
          8: '四字现'
        }
      ]
    function i(t) {
      ;((t = {
        current: t['paramMap.pageNum'],
        size: t['paramMap.pageSize'],
        smallType: t['paramMap.code'],
        betNo: t['paramMap.num']
      }),
        layui.utils.post('member/orders/oc', t, function (n) {
          !(function (t, n) {
            ;((t.rows = t.row.map(function (t) {
              return {
                odds: 1e4 * t.latestOdds,
                num: t.betNo
              }
            })),
              layui.laytpl(e).render(t, function (e) {
                ;(a('#tby').html(e),
                  layui.laypage.render({
                    elem: 'page',
                    curr: n.current,
                    count: t.rowCount,
                    limit: n.size,
                    limits: [10, 20, 30, 50, 100, 200],
                    layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
                    jump: function (t, e) {
                      e || ((n['paramMap.pageNum'] = t.curr), (n['paramMap.pageSize'] = t.limit), i(n))
                    }
                  }))
              }))
          })(n.data, t)
        }))
    }
    t('oddsChange', {
      render: function (t) {
        ;((t = t || {
          'paramMap.code': 2
        }),
          layui
            .laytpl(
              '<form class="layui-form"><div class="panel panel-success"><div class="panel-heading"><div class="panel-title text-center">检索条件</div></div><div class="panel-body"><div class="layui-inline"><label class="layui-form-label">号码</label><div class="layui-input-inline"><input type="text" name="paramMap.num" maxlength="6" class="layui-input set-w120"/></div></div><div class="layui-inline mgl30"><button class="btn btn-bg mgr5" lay-submit="" lay-filter="submitBtn">查询</button><button type="reset" class="btn btn-bg">重置</button></div></div></div></form><table class="table table-bd mgt15 mg0" border="1" width="100%"><thead><tr class="bgcolor-success"><th colspan="10"><ul class="ul-list layui-inline"><li class="ul-list-item" data-code="1"><a href="">一字定</a></li><li class="ul-list-item" data-code="2"><a href="">二字定</a></li><li class="ul-list-item" data-code="3"><a href="">三字定</a></li>\x3c!--                <li class="ul-list-item" data-code="4"><a href="">四字定</a></li>--\x3e</ul></th></tr></thead><thead><tr><td colspan="10" id="types" class="list-type"></td></tr></thead><tbody id="tby"></tbody></table><div class="bg-white clearfix pdt5 pdr15"><div id="page" class="pull-right"></div></div>'
            )
            .render({}, function (e) {
              ;(layui.main.container.content.html(e),
                layui.$("select[name='paramMap.code']").val(t['paramMap.code']),
                layui.$("input[name='paramMap.num']").val(t['paramMap.num']),
                layui.form.render(),
                layui.form.on('submit(submitBtn)', function (t) {
                  return (i(t.field), !1)
                }),
                layui.$('#types').on('click', 'a', function (e) {
                  ;(e.preventDefault(), (t['paramMap.code'] = this.getAttribute('data-code')), !t['paramMap.pageSize'] && (t['paramMap.pageSize'] = 50), layui.$(this).addClass('active-a').siblings().removeClass('active-a'), i(t))
                }),
                layui
                  .$('table .ul-list li')
                  .click(function (e) {
                    ;(e.preventDefault(), layui.$(this).addClass('active').siblings().removeClass('active'), (t['paramMap.code'] = this.getAttribute('data-code')))
                    var a = []
                    for (var i in ((this.types = n[(t['paramMap.code'] + '').substr(0, 1)]), this.types)) a.push('<a href="" data-code="' + i + '">' + this.types[i] + '</a>&nbsp;&nbsp;&nbsp;')
                    ;(layui.$('#types').html(a.join('')), layui.$('#types').find('a:first').click())
                  })
                  .eq(0)
                  .click())
            }))
      }
    })
  }),
  layui.define(function (t) {
    t('orderDetail', {
      render: function t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          a = e['paramMap.type'],
          n = void 0,
          i = void 0
        a && (2 === a.length ? (n = a) : (i = a))
        var l = {
          stageNo: e['paramMap.lttnum'] || void 0,
          betNo: e['paramMap.num'] || void 0,
          searchType: 'amt',
          start: e['paramMap.start'] || void 0,
          end: e['paramMap.end'] || void 0,
          smallType: n,
          locationType: i,
          ordStat: e['paramMap.st'] || void 0,
          orderWays: e['paramMap.bw'] || void 0,
          isWin: e['paramMap.iswin'] || void 0,
          current: e['paramMap.pageNum'] || 1,
          size: e['paramMap.pageSize'] || 20
        }
        layui.utils.post('member/orders/ordersInfoList', l, function (a) {
          var n = {
            lttnum: a.data.stageNo,
            rowCount: a.data.rowCount,
            pageInfo: {
              list: a.data.row
            }
          }
          layui
            .laytpl(
              '<form class="layui-form"><div class="panel panel-success"><div class="panel-heading"><div class="panel-title text-center">检索条件</div></div><div class="panel-body"><div class="layui-form-item layui-inline mg0"><label class="layui-form-label">查号码：</label><div class="layui-input-inline" style="width: 80px"><input type="text" name="paramMap.num" maxlength="6" class="layui-input" /><input type="hidden" name="paramMap.lttnum" /></div></div><div class="layui-form-item layui-inline mg0"><label class="layui-form-label">金额：</label><div class="layui-input-inline" style="width: 80px"><input type="text" name="paramMap.start" maxlength="6" class="layui-input" /></div><div class="layui-form-mid">至</div><div class="layui-input-inline" style="width: 80px"><input type="text" name="paramMap.end" maxlength="6" class="layui-input" /></div></div><div class="layui-form-item layui-inline mg0"><label class="layui-form-label">类型：</label><div class="layui-input-inline set-w90"><select name="paramMap.type"><option value="">全部</option><option value="1">一字定</option><option value="10">口XX</option><option value="11">X口X</option><option value="12">XX口</option><option value="2">二字定</option><option value="20">口口X</option><option value="21">口X口</option><option value="22">X口口</option><option value="3">三字定</option><option value="30">口口口</option><option value="80">1～3球单双</option><option value="81">1～3球大小</option><option value="82">总和单双</option><option value="83">总和大小</option><option value="84">龙虎</option><option value="85">龙虎和:和</option><option value="90">番</option><option value="91">念</option><option value="92">正</option><option value="93">角</option><option value="94">番大小</option><option value="95">番单双</option><option value="96">通</option><option value="97">三门</option></select></div></div><div class="layui-form-item layui-inline mg0"><label class="layui-form-label">下注方式：</label><div class="layui-input-inline set-w120"><select name="paramMap.bw"><option value="">全部</option><option value="3">快打</option><option value="4">快选</option><option value="2">二字定</option><option value="6">txt导入</option><option value="1">一字定</option><option value="5">快译</option><option value="9">两面盘</option><option value="10">番摊</option>\x3c!-- <option value="7">手动追号</option><option value="8">自动追号</option> --\x3e</select></div></div><div class="layui-form-item layui-inline mg0"><label class="layui-form-label">状态：</label><div class="layui-input-inline set-w90"><select name="paramMap.st"><option value="">全部</option><option value="1">正常</option><option value="2">退码</option></select></div></div><div class="layui-form-item layui-inline mg0"><label class="layui-form-label">结果：</label><div class="layui-input-inline set-w90"><select name="paramMap.iswin"><option value="">全部</option><option value="0">不中</option><option value="1">中</option><option value="2">和</option></select></div></div><button class="btn btn-bg mgl15" lay-submit="" lay-filter="submitBtn">&nbsp;查询</button><button class="btn btn-bg mgl15" lay-submit="" lay-filter="winDetailBtn">中奖明细</button>\x3c!-- <button type="button" class="layui-btn layui-btn-normal layui-btn-small mgl15" onclick="layui.main.print()">打印</button> --\x3e</div></div><div class="panel panel-success mgt15"><div class="panel-heading clearfix"><div class="panel-title text-center">第{{d.lttnum}}期下单明细</div></div><div class="panel-body pd0"><table class="table table-bd mg0 table-hover"><thead><tr><th>注单编号</th><th>下单时间</th><th>号码</th><th>类型</th><th>下注方式</th><th>金额</th><th>赔率</th><th>中奖</th><th>回水</th><th>盈亏</th><th>结果</th><th>状态</th><th><input lay-filter="cbs" type="checkbox" lay-skin="primary" />全选</th></tr></thead><tbody>{{# layui.each(d.pageInfo.list,function(i,item){}}{{# if(item.ordStat==2){ }}<tr class="row-red bgcolor-gray"><td>{{item.batId}}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.ordTime}}<br />退&nbsp;{{item.ordRfdTime}}</td><td><b class="text-blue">{{layui.utils.numHandel(item.betNo)}}</b></td><td>{{item.stName}}</td><td>{{item.owName}}</td><td>{{item.amt}}</td><td>{{item.odds}}</td><td>--</td><td>{{item.memberReturnAmt}}</td><td>--</td><td>--</td><td>退码</td><td>--</td></tr>{{# }else{ }}{{# item.ykAmt }}{{# d.jes = (d.jes||0) + item.amt * 1e4; }}{{# d.zjs = (d.zjs||0) + item.bonusAmt * 1e4; }}{{# d.hss = (d.hss||0) + item.memberReturnAmt * 1e4; }}{{# d.yks = (d.yks||0) + item.ykAmt * 1e4; }}<tr><td>{{item.batId}}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.ordTime}}</td><td><b class="text-blue">{{layui.utils.numHandel(item.betNo)}}</b></td><td>{{item.stName}}</td><td>{{item.owName}}</td><td>{{item.amt}}</td><td>{{item.odds}}</td><td>{{item.bonusAmt}}</td><td>{{item.memberReturnAmt}}</td><td>{{item.ykAmt}}</td><td>{{# if(item.isWin==0){ }}不中{{# }else if(item.isWin==1){ }}中{{# }else if(item.isWin==2){ }}和{{# }else{ }}--{{# } }}</td><td>正常</td><td>{{# if(item.ordStat==1){ }}<input lay-filter="cb" type="checkbox" data-seq="{{item.batId}}" value="{{item.ordId}}" lay-skin="primary" />{{# }else{ }} -- {{# } }}</td></tr>{{# } }}{{# }) }}</tbody><tfoot><tr><td><b>合计</b></td><td>--</td><td>--</td><td>--</td><td>--</td><td><b>{{layui.utils.numFormat(d.jes,2)}}</b></td><td>--</td><td><b>{{layui.utils.numFormat(d.zjs,2)}}</b></td><td><b>{{layui.utils.numFormat(d.hss,4)}}</b></td><td><b>{{layui.utils.numFormat(d.yks,2)}}</b></td><td>--</td><td>--</td><td><button type="button" id="returnCode" class="layui-btn layui-btn-normal layui-btn-small">退码</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="returnCodes" class="layui-btn layui-btn-danger layui-btn-small">整批退码</button></td></tr></tfoot></table><div class="clearfix pdt5 pdr15"><div id="page" class="pull-right"></div></div></div></div></form>'
            )
            .render(n, function (a) {
              ;(layui.main.container.content.html(a),
                (e = e || {}),
                layui.$("[name='paramMap.num']").val(e['paramMap.num']),
                layui.$("[name='paramMap.start']").val(e['paramMap.start']),
                layui.$("[name='paramMap.end']").val(e['paramMap.end']),
                layui.$("[name='paramMap.type']").val(e['paramMap.type']),
                layui.$("[name='paramMap.st']").val(e['paramMap.st']),
                layui.$("[name='paramMap.iswin']").val(e['paramMap.iswin']),
                layui.$("[name='paramMap.lttnum']").val(e['paramMap.lttnum']),
                layui.$("[name='paramMap.bw']").val(e['paramMap.bw']),
                layui.form.on('submit(submitBtn)', function (e) {
                  return (t(e.field), !1)
                }),
                layui.form.on('submit(winDetailBtn)', function (e) {
                  return ((e.field['paramMap.iswin'] = 1), t(e.field), !1)
                }),
                layui.laypage.render({
                  elem: 'page',
                  curr: l.current,
                  count: n.rowCount,
                  limit: l.size,
                  limits: [10, 20, 30, 50, 100, 200],
                  layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
                  jump: function (a, n) {
                    n || ((e['paramMap.pageNum'] = a.curr), (e['paramMap.pageSize'] = a.limit), t(e))
                  }
                }),
                layui.form.on('checkbox(cbs)', function (t) {
                  ;(layui.$('input[lay-filter=cb]').prop('checked', t.elem.checked), layui.form.render('checkbox'))
                }),
                layui.form.on('checkbox(cb)', function (t) {
                  ;(layui.$('input[lay-filter=cb]').size() === layui.$('input[lay-filter=cb]:checked').size() ? layui.$('input[lay-filter=cbs]').prop('checked', !0) : layui.$('input[lay-filter=cbs]').prop('checked', !1), layui.form.render('checkbox'))
                }),
                layui.$('#returnCode').click(function (a) {
                  a.preventDefault()
                  var i = []
                  ;(layui.each(layui.$('input[lay-filter=cb]:checked'), function (t, e) {
                    i.push(e.value)
                  }),
                    i.length > 0
                      ? layui.utils.confirm('确认将选中的码全部退掉吗？', function () {
                          layui.utils.post(
                            'member/orders/orderRefund',
                            {
                              stageNo: n.lttnum,
                              ids: i.join(',')
                            },
                            function (a) {
                              layui.utils.success('退码成功！', function () {
                                ;(t(e), layui.main.initUserInfo(), layui.main.showUnprint())
                              })
                            }
                          )
                        })
                      : layui.utils.msg('请选择要退码的号码！'))
                }),
                layui.$('#returnCodes').click(function (a) {
                  a.preventDefault()
                  var i = [],
                    l = {}
                  ;(layui.each(layui.$('input[lay-filter=cb]:checked'), function (t, e) {
                    var a = layui.$(e).data('seq')
                    1 != l[a] && ((l[a] = 1), i.push(a))
                  }),
                    i.length > 0
                      ? layui.utils.confirm('确认将选中的相关批次的码全部退掉吗？', function () {
                          layui.utils.post(
                            'member/orders/refundBatch',
                            {
                              stageNo: n.lttnum,
                              ids: i.join(',')
                            },
                            function (a) {
                              layui.utils.success('退码成功！', function () {
                                ;(t(e), layui.main.initUserInfo(), layui.main.showUnprint())
                              })
                            }
                          )
                        })
                      : layui.utils.msg('请选择要退码的号码！'))
                }),
                layui.form.render())
            })
        })
      }
    })
  }),
  layui.define(function (t) {
    t('orderHistory', {
      render: function t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          a = layui.main.container.content,
          n = {
            current: e['paramMap.pageNum'] || 1,
            size: e['paramMap.pageSize'] || 20
          }
        layui.utils.post('member/report/history', n, function (i) {
          layui
            .laytpl(
              '<table class="table table-bd mg0 table-hover" border="1" width="100%"><thead><tr class="bgcolor-success"><th>日期</th><th>期号</th><th>笔数</th><th>金额</th><th>回水</th><th>中奖</th><th>盈亏</th><th>操作</th></tr></thead><tbody>{{# layui.each(d.data.row,function(i,item){ }}{{# d.cou = (d.cou||0) + item.orderMemberOrders; }}{{# d.jes = (d.jes||0) + item.orderMemberTotalAmt * 1e4; }}{{# d.zjs = (d.zjs||0) + item.memberBonusAmt * 1e4; }}{{# d.hss = (d.hss||0) + item.memberReturnAmt * 1e4; }}{{# d.yks = (d.yks||0) + item.ykAmt * 1e4; }}<tr><td>{{item.stage}}</td><td><a class="text-hyperlink" name="detail" href="" data-lttnum="{{item.stageNo}}">{{item.stageNo}}</a></td><td>{{item.orderMemberOrders}}</td><td>{{layui.utils.numFormat(item.orderMemberTotalAmt,1,false)}}</td><td>{{layui.utils.numFormat(item.memberReturnAmt,1,false)}}</td><td>{{layui.utils.numFormat(item.memberBonusAmt,1,false)}}</td><td><span class="{{item.ykAmt>0?\'text-red\':\'text-green\'}}">{{layui.utils.numFormat(item.ykAmt,1,false)}}</span></td><td><a class="text-hyperlink" name="printWin" href="" data-lttnum="{{item.stageNo}}">打印中奖明细</a></td></tr>{{# }) }}{{# if(!d.data.row||d.data.row.length==0){ }}<tr><td colspan="8">没有更多账单</td></tr>{{# } }}</tbody><tfoot><tr><td><b>合计</b></td><td></td><td><b>{{d.cou || 0}}</b></td><td><b>{{layui.utils.numFormat(d.jes,1)}}</b></td><td><b>{{layui.utils.numFormat(d.hss,1)}}</b></td><td><b>{{layui.utils.numFormat(d.zjs,1)}}</b></td><td><b>{{layui.utils.numFormat(d.yks,1)}}</b></td><td></td></tr></tfoot></table><div class="bg-white clearfix pdt5 pdr15"><div id="page" class="pull-right"></div></div>'
            )
            .render(i, function (l) {
              ;(a.html(l),
                layui.laypage.render({
                  elem: 'page',
                  curr: n.current,
                  count: i.data.rowCount,
                  limit: n.size,
                  limits: [10, 20, 30, 50, 100, 200, 300],
                  layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
                  jump: function (a, n) {
                    n || ((e['paramMap.pageNum'] = a.curr), (e['paramMap.pageSize'] = a.limit), t(e))
                  }
                }),
                layui.$('a[name=detail]', a).click(function (t) {
                  t.preventDefault()
                  var e = this.getAttribute('data-lttnum')
                  layui.use('orderDetail', function (t) {
                    t.render({
                      'paramMap.lttnum': e
                    })
                  })
                }),
                layui.$('a[name=printWin]', a).click(function (t) {
                  ;(t.preventDefault(), layui.utils.msg('已暂停打印功能'))
                }))
            })
        })
      }
    })
  }),
  layui.define(['form', 'laypage'], function (t) {
    var e = layui.$,
      a = '',
      n = !1
    function i() {
      ;(0 == layui.$('#game_result_path').length && (layui.$('#content').width(), layui.$('.table1').width()),
        layui.utils.post(
          'member/odds/fantan/showHistory',
          {},
          function (t) {
            for (var e = t.data, a = [[], [], [], [], [], [], [], [], [], []], n = 0; n < 12; n++)
              for (var i = 0; i < 10; i++) {
                var l = e[10 * n + i] || ''
                a[i][n] = l ? (l % 2 == 0 ? "<font color='#e75f06'>" + l + '</font>' : "<font color='#706b4d'>" + l + '</font>') : ''
              }
            for (i = 0; i < 10; i++)
              for (n = 0; n < 12; n++) {
                var r = a[i][n] || ''
                layui.$('#game_result_path tr:eq(' + i + ') td:eq(' + n + ')').html(r)
              }
          },
          null,
          null,
          null,
          !1
        ))
    }
    function l(t) {
      ;(!t && localStorage && localStorage.getItem('lotKJJE') && (t = JSON.parse(localStorage.getItem('lotKJJE'))),
        t || (t = [50, 100, 200, 500, 1e3]),
        localStorage && localStorage.setItem('lotKJJE', JSON.stringify(t)),
        e('#kjje').html(
          '\n\t\t\t<a href="javascript:void(0)" style="margin-left: 3px;">'
            .concat(t[0], '</a>\n\t\t\t<a href="javascript:void(0)" style="margin-left: 3px;">')
            .concat(t[1], '</a>\n\t\t\t<a href="javascript:void(0)" style="margin-left: 3px;">')
            .concat(t[2], '</a>\n\t\t\t<a href="javascript:void(0)" style="margin-left: 3px;">')
            .concat(t[3], '</a>\n\t\t\t<a href="javascript:void(0)" style="margin-left: 3px;margin-right: 3px;">')
            .concat(t[4], '</a>\n\t\t\t')
        ),
        e('#kjje2').html(
          '\n\t\t\t<input class="input onlyNum" type="text" value='
            .concat(t[0], ' >\n\t\t\t<input class="input onlyNum" type="text" value=')
            .concat(t[1], ' >\n\t\t\t<input class="input onlyNum" type="text" value=')
            .concat(t[2], ' >\n\t\t\t<input class="input onlyNum" type="text" value=')
            .concat(t[3], ' >\n\t\t\t<input class="input onlyNum" type="text" value=')
            .concat(t[4], ' >\n\t\t\t<div class="base-clear"></div>\n\t\t\t<input id="setJJJE" class="btn" type="button" value="确定">\n\t\t\t')
        ))
    }
    ;(setInterval(function () {
      layui.$('#game_result_path').length > 0 && layui.$('#lttnum').text() > 0 && i()
    }, 5e3),
      t('fantan', {
        render: function () {
          function t(t) {
            ;((n = !1), (a = t.isOpen))
            var r = 'open' == layui.main.container.status
            layui
              .laytpl(
                '<div class="fant-page fant-content"><table class="table1" border="1" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td class="td1 men"><div><span class="name">三门234</span><br><span class="rate">--</span></div><div><input type="text" name="三门234" class="input"/></div></td><td class="td1 tong"><div><span class="name">一通23</span><br><span class="rate">--</span></div><div><input type="text" name="一通23" class="input"/></div></td><td class="td1 tong"><div><span class="name">一通24</span><br><span class="rate">--</span></div><div><input type="text" name="一通24" class="input"/></div></td><td class="td1 tong"><div><span class="name">一通34</span><br><span class="rate">--</span></div><div><input type="text" name="一通34" class="input"/></div></td><td class="jiao"><div><span class="name">12角</span><br><span class="rate">--</span></div><div><input type="text" name="12角" class="input"/></div></td><td><div><span class="name">1念2</span><br><span class="rate">--</span></div><div><input type="text" name="1念2" class="input"/></div></td><td><div><span class="name">1念3</span><br><span class="rate">--</span></div><div><input type="text" name="1念3" class="input"/></div></td><td><div><span class="name">1念4</span><br><span class="rate">--</span></div><div><input type="text" name="1念4" class="input"/></div></td><td class="jiao"><div><span class="name">14角</span><br><span class="rate">--</span></div><div><input type="text" name="14角" class="input"/></div></td></tr><tr><td class="td1 men"><div><span class="name">三门134</span><br><span class="rate">--</span></div><div><input type="text" name="三门134" class="input"/></div></td><td class="td1 tong"><div><span class="name">二通13</span><br><span class="rate">--</span></div><div><input type="text" name="二通13" class="input"/></div></td><td class="td1 tong"><div><span class="name">二通14</span><br><span class="rate">--</span></div><div><input type="text" name="二通14" class="input"/></div></td><td class="td1 tong"><div><span class="name">二通34</span><br><span class="rate">--</span></div><div><input type="text" name="二通34" class="input"/></div></td><td><div><span class="name">2念1</span><br><span class="rate">--</span></div><div><input type="text" name="2念1" class="input"/></div></td><td colspan="3" rowspan="3"><table class="table1-1" width="100%" cellspacing="0" cellpadding="0"><tr><td width="25%"></td><td width="50%"><div><span class="name">1番</span><br><span class="rate">--</span></div><div><input type="text" name="1番" class="input"/></div></td><td width="25%"></td></tr><tr><td><div><span class="name">2番</span><br><span class="rate">--</span></div><div><input type="text" name="2番" class="input"/></div></td><td><div class="center"><div class="center-1"><span class="name">单</span><span class="rate">--</span><br><input type="text" name="番单" class="input"/></div><div class="center-1"><span class="name">双</span><span class="rate">--</span><br><input type="text" name="番双" class="input"/></div></div><div class="center"><div class="center-1"><span class="name">大</span><span class="rate">--</span><br><input type="text" name="番大" class="input"/></div><div class="center-1"><span class="name">小</span><span class="rate">--</span><br><input type="text" name="番小" class="input"/></div></div></td><td><div><span class="name">4番</span><br><span class="rate">--</span></div><div><input type="text" name="4番" class="input"/></div></td></tr><tr><td></td><td><div><span class="name">3番</span><br><span class="rate">--</span></div><div><input type="text" name="3番" class="input"/></div></td><td></td></tr></table></td><td><div><span class="name">4念1</span><br><span class="rate">--</span></div><div><input type="text" name="4念1" class="input"/></div></td></tr><tr><td class="td1 men"><div><span class="name">三门124</span><br><span class="rate">--</span></div><div><input type="text" name="三门124" class="input"/></div></td><td class="td1 tong"><div><span class="name">三通12</span><br><span class="rate">--</span></div><div><input type="text" name="三通12" class="input"/></div></td><td class="td1 tong"><div><span class="name">三通14</span><br><span class="rate">--</span></div><div><input type="text" name="三通14" class="input"/></div></td><td class="td1 tong"><div><span class="name">三通24</span><br><span class="rate">--</span></div><div><input type="text" name="三通24" class="input"/></div></td><td><div><span class="name">2念3</span><br><span class="rate">--</span></div><div><input type="text" name="2念3" class="input"/></div></td><td><div><span class="name">4念2</span><br><span class="rate">--</span></div><div><input type="text" name="4念2" class="input"/></div></td></tr><tr><td class="td1 men"><div><span class="name">三门123</span><br><span class="rate">--</span></div><div><input type="text" name="三门123" class="input"/></div></td><td class="td1 tong"><div><span class="name">四通12</span><br><span class="rate">--</span></div><div><input type="text" name="四通12" class="input"/></div></td><td class="td1 tong"><div><span class="name">四通13</span><br><span class="rate">--</span></div><div><input type="text" name="四通13" class="input"/></div></td><td class="td1 tong"><div><span class="name">四通23</span><br><span class="rate">--</span></div><div><input type="text" name="四通23" class="input"/></div></td><td><div><span class="name">2念4</span><br><span class="rate">--</span></div><div><input type="text" name="2念4" class="input"/></div></td><td><div><span class="name">4念3</span><br><span class="rate">--</span></div><div><input type="text" name="4念3" class="input"/></div></td></tr><tr><td class="td1"><div><span class="name">1正</span><br><span class="rate">--</span></div><div><input type="text" name="1正" class="input"/></div></td><td><div><span class="name">2正</span><br><span class="rate">--</span></div><div><input type="text" name="2正" class="input"/></div></td><td><div><span class="name">3正</span><br><span class="rate">--</span></div><div><input type="text" name="3正" class="input"/></div></td><td><div><span class="name">4正</span><br><span class="rate">--</span></div><div><input type="text" name="4正" class="input"/></div></td><td class="jiao"><div><span class="name">23角</span><br><span class="rate">--</span></div><div><input type="text" name="23角" class="input"/></div></td><td><div><span class="name">3念1</span><br><span class="rate">--</span></div><div><input type="text" name="3念1" class="input"/></div></td><td><div><span class="name">3念2</span><br><span class="rate">--</span></div><div><input type="text" name="3念2" class="input"/></div></td><td><div><span class="name">3念4</span><br><span class="rate">--</span></div><div><input type="text" name="3念4" class="input"/></div></td><td class="jiao"><div><span class="name">34角</span><br><span class="rate">--</span></div><div><input type="text" name="34角" class="input"/></div></td></tr></tbody></table><div id="gameBoxTool" class="game_box_tool base-clear" style="margin-top: 10px;min-width: 940px;"><div class="tool_left"><div id="tool_ys_wrap" class="t_left"><label for="tool_ys_input">快捷下注金额：</label><input id="tool_ys_input" class="input onlyNum" maxlength="7" type="text"><span id="kjje"><a href="javascript:void(0)" style="margin-left: 3px;">50</a><a href="javascript:void(0)" style="margin-left: 3px;">100</a><a href="javascript:void(0)" style="margin-left: 3px;">200</a><a href="javascript:void(0)" style="margin-left: 3px;">500</a><a href="javascript:void(0)" style="margin-left: 3px;margin-right: 3px;">1000</a></span><em><b id="showSet">+</b><strong id="kjje2"><input class="input onlyNum" type="text"><input class="input onlyNum" type="text"><input class="input onlyNum" type="text"><input class="input onlyNum" type="text"><input class="input onlyNum" type="text"><div class="base-clear"></div><input id="setJJJE" class="btn" type="button" value="确定"></strong></em></div></div><div class="t_right"><button id="bet" class="font-xlarge pd5 mgl15">下注</button><button id="reset" type="button" class="font-xlarge pd5 mgl15">取消</button></div></div></div><table class="path" width="330" id="game_result_path" height="270" cellpadding="0" cellspacing="0" style="float: left; margin-top: 53px; margin-left: 15px; border-top: 1px solid #888; border-left: 1px solid #888"><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>'
              )
              .render({}, function (a) {
                if ((layui.main.container.content.html(a), i(), r)) {
                  ;(l(),
                    e('#showSet').click(function () {
                      ;((e('#kjje2')[0].style = 'display:block'), l())
                    }),
                    e('#kjje2').on('click', '#setJJJE', function () {
                      var t = e(this).parent().find('input')
                      ;(l([t[0].value, t[1].value, t[2].value, t[3].value, t[4].value]), (e('#kjje2')[0].style = 'display:none'))
                    }),
                    e('#kjje').on('click', 'a', function () {
                      var t
                      ;(e('#tool_ys_input').val(e(this).text()),
                        (t = e('#tool_ys_input').val()),
                        e.each(e('ul li.bgcolor-yellow input'), function (e, a) {
                          '' == a.value && (a.value = t)
                        }))
                    }),
                    e('td input', layui.main.container.content).focus(function () {
                      '' == this.value ? (this.value = e('#tool_ys_input').val()) : (this.value = '')
                    }),
                    layui.$('#reset', layui.main.container.content).on('click', function (t) {
                      ;(t.preventDefault(), layui.$('td input', layui.main.container.content).val(''), layui.$('#amounts').text(0))
                    }),
                    layui.$('input', layui.main.container.content).on('keyup', function (t) {
                      var e
                      ;(t.preventDefault(),
                        (this.value = this.value.replace(/[^0-9\.]/gi, '').toUpperCase()),
                        (e = 0),
                        layui.each(layui.$('input', layui.main.container.content), function (t, a) {
                          'allAmount' != this.id && Number(a.value) > 0 && (e += Number(a.value))
                        }),
                        layui.$('#amounts').text(e))
                    }),
                    layui.$.each(t.data, function (t, e) {
                      var a = layui.$('[name=' + e.betNo + ']')
                      a.parent().find('.rate').length > 0
                        ? a
                            .parent()
                            .find('.rate')
                            .text(layui.utils.numFormat(e.odds, 4, !1))
                        : a.parent().parent().find('.rate').length > 0 &&
                          a
                            .parent()
                            .parent()
                            .find('.rate')
                            .text(layui.utils.numFormat(e.odds, 4, !1))
                    }),
                    layui.$('#bet', layui.main.container.content).on('click', function (t) {
                      t.preventDefault()
                      var a = [],
                        n = 0
                      if (
                        (layui.each(layui.$('td input', layui.main.container.content), function (t, e) {
                          if ('allAmount' != this.id && Number(e.value) > 0) {
                            var i = layui.$(this).attr('name')
                            ;((n += Number(e.value)),
                              a.push({
                                bn: i,
                                am: e.value
                              }))
                          }
                        }),
                        0 == a.length)
                      )
                        return (layui.utils.msg('请选择要下单的号码'), !1)
                      if (0 == n) return (layui.utils.msg('请输入下单金额'), !1)
                      var i = layui.utils.guid().replace(/-/g, 'f'),
                        l = e(layui.main.container.lttnum).filter(':first').text()
                      layui.utils.post({
                        url: 'member/bet/doOrder',
                        data: {
                          ock: i,
                          betNoList: a,
                          orderWays: 8,
                          stageNo: l
                        },
                        type: 'POST',
                        isSystemHandle: !1,
                        dataType: 'JSON',
                        success: function (t) {
                          if (t.successCode > 0) (layui.main.showUnprint(), layui.main.initUserInfo(), layui.main.palyAudio('success'), layui.$('#reset', layui.main.container.content).click())
                          else {
                            var e = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                            ;(layui.utils.msg(e), layui.main.palyAudio('fail'), t.msg && layui.utils.msg(t.msg + '<br>' + e))
                          }
                        },
                        error: function () {
                          layui.utils.msg('系统繁忙，请稍后再试!')
                        }
                      })
                    }))
                }
                r ? layui.$('input', layui.main.container.content).removeAttr('disabled') : layui.$('input', layui.main.container.content).attr('disabled', !r)
              })
          }
          ;(a == ('open' == layui.main.container.status) && layui.$('.fant-table').length > 0) || n || ((n = !0), layui.utils.post('member/odds/fantan', {}, t))
        }
      }))
  }),
  layui.define(['form', 'utils'], function (t) {
    var e = layui.jquery,
      a = layui.laytpl,
      n = layui.utils,
      i = layui.form
    function l(t) {
      ;(!t && localStorage && localStorage.getItem('lotKJJE') && (t = JSON.parse(localStorage.getItem('lotKJJE'))),
        t || (t = [50, 100, 200, 500, 1e3]),
        localStorage && localStorage.setItem('lotKJJE', JSON.stringify(t)),
        e('#kjje').html(
          '\n\t\t\t<a href="javascript:void(0)">'
            .concat(t[0], '</a>\n\t\t\t<a href="javascript:void(0)">')
            .concat(t[1], '</a>\n\t\t\t<a href="javascript:void(0)">')
            .concat(t[2], '</a>\n\t\t\t<a href="javascript:void(0)">')
            .concat(t[3], '</a>\n\t\t\t<a href="javascript:void(0)">')
            .concat(t[4], '</a>\n\t\t\t')
        ),
        e('#kjje2').html(
          '\n\t\t\t<input class="input onlyNum" type="text" value='
            .concat(t[0], ' >\n\t\t\t<input class="input onlyNum" type="text" value=')
            .concat(t[1], ' >\n\t\t\t<input class="input onlyNum" type="text" value=')
            .concat(t[2], ' >\n\t\t\t<input class="input onlyNum" type="text" value=')
            .concat(t[3], ' >\n\t\t\t<input class="input onlyNum" type="text" value=')
            .concat(t[4], ' >\n\t\t\t<div class="base-clear"></div>\n\t\t\t<input id="setJJJE" class="btn" type="button" value="确定">\n\t\t\t')
        ))
    }
    t('liangmian', {
      render: function () {
        var t = {}
        'open' == layui.main.container.status
          ? n.post('member/odds/pan', '', function (r) {
              200 == r.code &&
                a(
                  '<form class="layui-form"><div class="game_box_con"><div class="game_item_warp" style=""><div id="gameBox" class="game_item" style="display: block;"><div class="game_ball_wrap game_item_wrap base-clear"><div class="game_box col_1 gameBox base-clear"><div class="game_con"><fieldset><legend>第一球</legend><ul><li data-name="第一球:单"><span class="name"><i>单</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li><li data-name="第一球:双"><span class="name"><i>双</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li><li data-name="第一球:大"><span class="name"><i>大</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li><li data-name="第一球:小"><span class="name"><i>小</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></fieldset></div></div><div class="game_box col_1 gameBox base-clear"><div class="game_con"><fieldset><legend>第二球</legend><ul><li data-name="第二球:单"><span class="name"><i>单</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li><li data-name="第二球:双"><span class="name"><i>双</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li><li data-name="第二球:大"><span class="name"><i>大</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li><li data-name="第二球:小"><span class="name"><i>小</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></fieldset></div></div><div class="game_box col_1 gameBox base-clear"><div class="game_con"><fieldset><legend>第三球</legend><ul><li data-name="第三球:单"><span class="name"><i>单</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li><li data-name="第三球:双"><span class="name"><i>双</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li><li data-name="第三球:大"><span class="name"><i>大</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li><li data-name="第三球:小"><span class="name"><i>小</i></span><span class="p"><a class="oddsEvent" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></fieldset></div></div><div class="game_box base-clear"><div class="game_con"><table bgcolor="#f0f6fd" border="1px solid #d0ddec;" class="u-table2" width="100%" style="text-align: center;margin-left: 2px;"><thead><tr><th colspan="12">总和、龙虎和</th></tr></thead><tbody><tr><td><ul style="width: auto"><li style="width: auto" data-name="总合:单"><span class="name"><i>单</i></span><span class="p"><a class="oddsEvent" undefined="" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></td><td><ul style="width: auto"><li style="width: auto" data-name="总合:双"><span class="name"><i>双</i></span><span class="p"><a class="oddsEvent" undefined="" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></td><td><ul style="width: auto"><li style="width: auto" data-name="总合:大"><span class="name"><i>大</i></span><span class="p"><a class="oddsEvent" undefined="" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></td><td><ul style="width: auto"><li style="width: auto" data-name="总合:小"><span class="name"><i>小</i></span><span class="p"><a class="oddsEvent" undefined="" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></td></tr><tr style="border-top: 10px"><td><ul style="width: auto"><li style="width: auto" data-name="龙虎:龙"><span class="name"><i>龙</i></span><span class="p"><a class="oddsEvent" undefined="" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></td><td><ul style="width: auto"><li style="width: auto" data-name="龙虎:虎"><span class="name"><i>虎</i></span><span class="p"><a class="oddsEvent" undefined="" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></td><td><ul style="width: auto"><li style="width: auto" data-name="龙虎和:和"><span class="name"><i>和</i></span><span class="p"><a class="oddsEvent" undefined="" href="javascript:;">-</a></span><span class="in"><input class="input onlyNum orderInput" type="text" maxlength="7"></span></li></ul></td><td class="name not-event"></td></tr></tbody></table></div></div></div></div><div id="gameBoxTool" class="game_box_tool base-clear" style=""><div class="tool_left"><div id="tool_ys_wrap" class="t_left"><label for="tool_ys_input">快捷下注金额：</label><input id="tool_ys_input" class="input onlyNum" maxlength="7" type="text"><span id="kjje"><a href="javascript:void(0)">50</a><a href="javascript:void(0)">100</a><a href="javascript:void(0)">200</a><a href="javascript:void(0)">500</a><a href="javascript:void(0)">1000</a></span><em><b id="showSet">+</b><strong id="kjje2"><input class="input onlyNum" type="text"><input class="input onlyNum" type="text"><input class="input onlyNum" type="text"><input class="input onlyNum" type="text"><input class="input onlyNum" type="text"><div class="base-clear"></div><input id="setJJJE" class="btn" type="button" value="确定"></strong></em></div></div><div class="t_right"><button id="betBtn" class="font-xlarge pd5 mgl15">下注</button><button id="cancelBtn" type="button" class="font-xlarge pd5 mgl15">取消</button></div></div></div></div></form>'
                ).render(t, function (t) {
                  ;(layui.main.container.content.html(t),
                    i.render(),
                    e.each(r.data, function (t, a) {
                      e('[data-name="'.concat(a.betNo, '"]'), layui.main.container.content).find('a.oddsEvent').text(a.odds)
                    }),
                    l(),
                    e('#showSet').click(function () {
                      ;((e('#kjje2')[0].style = 'display:block'), l())
                    }),
                    e('#kjje2').on('click', '#setJJJE', function () {
                      var t = e(this).parent().find('input')
                      ;(l([t[0].value, t[1].value, t[2].value, t[3].value, t[4].value]), (e('#kjje2')[0].style = 'display:none'))
                    }),
                    e('#kjje').on('click', 'a', function () {
                      var t
                      ;(e('#tool_ys_input').val(e(this).text()),
                        (t = e('#tool_ys_input').val()),
                        e.each(e('ul li.bgcolor-yellow input'), function (e, a) {
                          '' == a.value && (a.value = t)
                        }))
                    }),
                    e('.game_box_con').on('input propertychange', 'input', function (t) {
                      var a = e(this)
                        .val()
                        .replace(/[^0-9.]/gi, '')
                      e(this).val(a)
                    }),
                    e('ul li', layui.main.container.content).click(function () {
                      ;(e(this).toggleClass('bgcolor-yellow'), e(this).hasClass('bgcolor-yellow') ? e(this).find('input').val(e('#tool_ys_input').val()).select() : e(this).find('input').val(''))
                    }),
                    e('#cancelBtn').click(function () {
                      return (e('input', layui.main.container.content).val(''), e('ul li.bgcolor-yellow').removeClass('bgcolor-yellow'), !1)
                    }),
                    e('#betBtn').click(function () {
                      var t = []
                      if (
                        (e.each(e('ul li.bgcolor-yellow'), function (a, n) {
                          var i = e(n).find('input').val()
                          '' != i &&
                            i > 0 &&
                            t.push({
                              am: i,
                              bn: e(n).data('name')
                            })
                        }),
                        0 == t.length)
                      )
                        return (layui.utils.msg('请选择要投注的号码和输入金额'), !1)
                      var a = e(layui.main.container.lttnum).filter(':first').text()
                      return (
                        n.post({
                          url: 'member/bet/doOrder',
                          data: {
                            ock: layui.utils.guid().replace(/-/g, 'f'),
                            betNoList: t,
                            orderWays: 7,
                            stageNo: a
                          },
                          type: 'POST',
                          isSystemHandle: !1,
                          dataType: 'JSON',
                          success: function (t) {
                            if (t.successCode > 0) {
                              ;(layui.main.showUnprint(), layui.main.initUserInfo())
                              var a = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                              ;(layui.main.palyAudio('success'), e("input[name='ltMoy']").val(''), e('#childMenu').find('li:eq(4)').find('a').click())
                            } else {
                              a = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                              ;(layui.utils.msg(a), layui.main.palyAudio('fail'), t.msg && layui.utils.msg(t.msg + '<br>' + a))
                            }
                          },
                          error: function () {
                            layui.utils.msg('系统繁忙，请稍后再试!')
                          }
                        }),
                        !1
                      )
                    }))
                })
            })
          : a('<div class="closed">已封盘</div>').render(t, function (t) {
              ;(layui.main.container.content.html(t), i.render())
            })
      }
    })
  }),
  layui.define(function (t) {
    var e,
      a = layui.jquery,
      n = layui.laytpl,
      i = layui.utils,
      l = layui.form
    function r(t) {
      n(
        '{{# layui.each(d.list,function(index,item){ }}<tr><td class="tdcursor" onclick="rowSelect(this)">&nbsp;<i class="triangle-right"></i></td>{{# layui.each(item,function(idx,it){ }}<td class="tdcursor" onclick="tdSelect(this)" name="{{it.lotNum}}"><span class="pdl5 num-left">{{it.lotNum}}</span><b class="pdr5 odd-right {{ it.highlightFlag ? " text-blue" : "text-red" }} text-red" name="odds">{{it.odds}}</b></td>{{# }); }}</tr>{{# }); }}'
      ).render(t, function (t) {
        ;(a('#etby').html(t), l.render())
      })
    }
    function o(t) {
      'XXX口口' == t
        ? (a('#pfirst').text('拾'), a('#psecnd').text('个'), a('#iptFir').text('拾位'), a('#iptSec').text('个位'))
        : 'XX口X口' == t
          ? (a('#pfirst').text('佰'), a('#psecnd').text('个'), a('#iptFir').text('佰位'), a('#iptSec').text('个位'))
          : 'X口XX口' == t
            ? (a('#pfirst').text('仟'), a('#psecnd').text('个'), a('#iptFir').text('仟位'), a('#iptSec').text('个位'))
            : '口XXX口' == t
              ? (a('#pfirst').text('万'), a('#psecnd').text('个'), a('#iptFir').text('万位'), a('#iptSec').text('个位'))
              : 'XX口口X' == t
                ? (a('#pfirst').text('佰'), a('#psecnd').text('拾'), a('#iptFir').text('佰位'), a('#iptSec').text('拾位'))
                : 'X口X口X' == t
                  ? (a('#pfirst').text('仟'), a('#psecnd').text('拾'), a('#iptFir').text('仟位'), a('#iptSec').text('拾位'))
                  : '口XX口X' == t
                    ? (a('#pfirst').text('万'), a('#psecnd').text('拾'), a('#iptFir').text('万位'), a('#iptSec').text('拾位'))
                    : 'X口口XX' == t
                      ? (a('#pfirst').text('仟'), a('#psecnd').text('佰'), a('#iptFir').text('仟位'), a('#iptSec').text('佰位'))
                      : '口X口XX' == t
                        ? (a('#pfirst').text('万'), a('#psecnd').text('佰'), a('#iptFir').text('万位'), a('#iptSec').text('佰位'))
                        : '口口XXX' == t && (a('#pfirst').text('万'), a('#psecnd').text('仟'), a('#iptFir').text('万位'), a('#iptSec').text('仟位'))
    }
    function s(t) {}
    function u() {
      ;(a('#lotTCount').text(0), a('#lotTMoney').text(0), a("input[name='lotM']").val(''), a('#etby').find('td').removeClass('bgcolor-yellow'), a('button').removeClass('bgcolor-yellow'))
    }
    function p() {
      var t,
        e = (function () {
          var t = [],
            e = a('.ul-list').find('.text-7a023c').attr('data'),
            n = a('#positionF').find("button[name='position']").filter('.bgcolor-yellow').text(),
            i = a('#positionS').find("button[name='position']").filter('.bgcolor-yellow').text(),
            l = ''
          a('#positionF').find("button[name='small']").filter('.bgcolor-yellow').length > 0 && (l = '01234')
          var r = ''
          a('#positionF').find("button[name='big']").filter('.bgcolor-yellow').length > 0 && (r = '56789')
          var o = ''
          a('#positionF').find("button[name='odd']").filter('.bgcolor-yellow').length > 0 && (o = '13579')
          var s = ''
          a('#positionF').find("button[name='even']").filter('.bgcolor-yellow').length > 0 && (s = '02468')
          var u = ''
          a('#positionS').find("button[name='small']").filter('.bgcolor-yellow').length > 0 && (u = '01234')
          var p = ''
          a('#positionS').find("button[name='big']").filter('.bgcolor-yellow').length > 0 && (p = '56789')
          var f = ''
          a('#positionS').find("button[name='odd']").filter('.bgcolor-yellow').length > 0 && (f = '13579')
          var h = ''
          if ((a('#positionS').find("button[name='even']").filter('.bgcolor-yellow').length > 0 && (h = '02468'), (i = i + u + p + f + h), (n = n + l + r + o + s).length > 0 && i.length > 0))
            for (var m = c(d(n)), y = c(d(i)), g = 0; g < m.length; g++) {
              var b = e
              b = b.replace('口', m[g] + '')
              for (var v = 0; v < y.length; v++) {
                var O = b
                ;((O = O.replace('口', y[v] + '')), t.push(O))
              }
            }
          else a('#etby').find('td').removeClass('bgcolor-yellow')
          return t
        })(),
        n = (function () {
          var t = a('.ul-list').find('.text-7a023c').attr('data'),
            e = '',
            n = ''
          ;(a("#heS button[name='even']").filter('.bgcolor-yellow').length > 0 && (n = '02468'), a("#heF button[name='odd']").filter('.bgcolor-yellow').length > 0 && (e = '13579'))
          var i = a("#heF button[name='hf'],#heS button[name='hf']").filter('.bgcolor-yellow').text(),
            l = []
          if ((i = c(d((i = i + e + n))).join('')).length > 0)
            for (var r = d('0123456789'), o = d('0123456789'), s = 0; s < r.length; s++) {
              var u = t
              u = u.replace('口', r[s] + '')
              for (var p = 0; p < o.length; p++) {
                var f = (f = 1 * r[s] + 1 * o[p] + '').substr(f.length - 1)
                if (i.indexOf(f) >= 0) {
                  var h = u
                  ;((h = h.replace('口', o[p] + '')), l.push(h))
                }
              }
            }
          else a('#etby').find('td').removeClass('bgcolor-yellow')
          return l
        })(),
        i = []
      a("button[name='hf']").filter('.bgcolor-yellow').text()
      ;(e.length > 0 && n.length > 0 ? ((t = e), (i = c(n.concat(t)))) : e.length > 0 && n.length < 1 ? (i = e) : e.length < 1 && n.length > 0 && (i = n),
        (function (t) {
          a('#etby').find('td').removeClass('bgcolor-yellow')
          for (var e = 0; e < t.length; e++)
            a('#etby')
              .find("td[name='" + t[e] + "']")
              .addClass('bgcolor-yellow')
          h()
        })(i))
    }
    function d(t) {
      for (var e = [], a = 0; a < t.length; a++) e.push(t.charAt(a))
      return e
    }
    function c(t) {
      for (var e = [], a = 0; a < t.length; a++) {
        for (var n = !0, i = t[a], l = 0; l < e.length; l++)
          if (i === e[l]) {
            n = !1
            break
          }
        n && e.push(i)
      }
      return e
    }
    function f(t) {
      for (var e = [], a = 0; a < t.length; a++) e.push(t.charAt(a))
      return e
    }
    function h() {
      var t = a('#etby').find('td').filter('.bgcolor-yellow').length
      a('#lotTCount').text(t)
      var e = '' == a("input[name='lotM']").val() ? 0 : 1 * a("input[name='lotM']").val()
      a('#lotTMoney').text(Number(t * e).toFixed(2))
    }
    t('lotTwo', {
      render: function () {
        var t = {}
        if ('open' == layui.main.container.status) {
          ;(n(
            '<form class="layui-form"><div class="panel panel-success"><div class="panel-heading"><div class="panel-title layui-inline">类别&nbsp;<span class="ul-list layui-inline clearfix"><label class="ul-list-item text-7a023c" onclick="changeCategory(this);" data="口口X">口口X</label><label class="ul-list-item" onclick="changeCategory(this);" data="口X口">口X口</label><label class="ul-list-item" onclick="changeCategory(this);" data="X口口">X口口</label></span><div class="layui-inline text-7a023c"><b class="mgl15">笔数：<span id="lotTCount">0</span></b><b class="mgl15">总金额：<span id="lotTMoney">0</span></b></div></div></div><div class="panel-body pd0"><table class="table table-lotTwo mg0" border="1"><thead><tr><th class="lh20">&nbsp;</th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th><th class="thcursor lh20" onclick="colSelect(this);"><i class="triangle-down"></i></th></tr><tr><th>&nbsp;</th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th><th class="bgcolor-ffffc4"><span class="pdl5 num-left">号码</span><span class="pdr5 odd-right text-red">赔率</span></th></tr></thead><tbody id="etby"></tbody></table><table class="table mg0 table-lotTwo" border="1"><tbody><tr><td rowspan="2" width="3%" class="bgcolor-ffffc4"><b>定位置</b></td><td id="positionF"><b class="mgr5" id="pfirst">仟</b><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">0</button><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">1</button><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">2</button><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">3</button><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">4</button><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">5</button><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">6</button><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">7</button><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">8</button><button type="button" lay-filter="" name="position" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLot(this);">9</button><button type="button" lay-filter="" name="odd" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLotOther(this);">单</button><button type="button" lay-filter="" name="even" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLotOther(this);">双</button><button type="button" lay-filter="" name="big" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLotOther(this);">大</button><button type="button" lay-filter="" name="small" class="layui-btn layui-btn-primary lottwo-btn"onclick="posiLotOther(this);">小</button></td><td rowspan="2" width="3%" class="bgcolor-ffffc4"><b>合分</b></td><td id="heF"><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">0</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">1</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">2</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">3</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">4</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn"onclick="heOther(this);" name="odd">单</button></td><td rowspan="2"><div><b id="iptFir">仟位</b><div class="layui-input-inline"><input type="text" maxlength="10" id="ptFirst" name="posi" autocomplete="off"class="layui-input set-w90"></div></div><div class="mgt5"><b id="iptSec">佰位</b><div class="layui-input-inline"><input type="text" maxlength="10" id="ptSecond" name="posi" autocomplete="off"class="layui-input set-w90"></div></div></td><td rowspan="2" class="text-left"><div><div class="layui-input-inline mgl15"><input type="text" name="lotM" lay-verify="required" value="" maxlength="7" autocomplete="off"class="layui-input input-large font-wght font-xlarge set-w90 mgr5"></div><input type="checkbox" id="repeat" checked="checked" lay-skin="primary" title="除重"><button  class="pd5 font-xlarge mgr15" type="button" onclick="lotNum(this);">下注</button><button class="pd5 font-xlarge mgr15" type="button" onclick="cancle();">取消</button>\x3c!-- <button type="button" autoTask=1 class="pd5 font-xlarge" onclick="lotNum(this);">追号</button> --\x3e</div></td></tr><tr><td id="positionS"><b class="mgr5" id="psecnd">佰</b><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">0</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">1</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">2</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">3</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">4</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">5</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">6</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">7</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">8</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="position"onclick="posiLot(this);">9</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="odd"onclick="posiLotOther(this);">单</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="even"onclick="posiLotOther(this);">双</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="big"onclick="posiLotOther(this);">大</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" name="small"onclick="posiLotOther(this);">小</button></td><td id="heS"><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">5</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">6</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">7</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">8</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn" onclick="heFen(this);"name="hf">9</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lottwo-btn"onclick="heOther(this);" name="even">双</button></td></tr></tbody></table></div></div></form>'
          ).render(t, function (t) {
            ;(layui.main.container.content.html(t), l.render())
          }),
            a('#lotTCount').text(0),
            a('#lotTMoney').text(0),
            a("input[name='lotM']").val(''),
            a('.bgcolor-yellow').removeClass('bgcolor-yellow'),
            a('.ul-list label:first').addClass('text-7a023c'),
            a('.ul-list label:first').siblings().removeClass('text-7a023c'),
            (e = a('.ul-list').find('label:first').text()))
          var u = {
            smallType: layui.dict.bigType2NumberDes(e)
          }
          ;(i.post('member/odds/two', u, function (t) {
            if (200 === t.code) {
              var e = {},
                a = 0,
                n = layui.dict.bigType2locationTypeDes(u.smallType),
                i = 1e4 * layui.dict.maxOddsDict[n]
              ;((e.list = t.data.reduce(function (t, e, n) {
                return (
                  n > 0 && n % 10 == 0 && a++,
                  t[a] || (t[a] = []),
                  t[a].push({
                    lotNum: e.betNo,
                    odds: e.odds,
                    lotOdds: i,
                    highlightFlag: e.highlightFlag
                  }),
                  t
                )
              }, [])),
                r(e),
                s(t.change))
            } else layui.utils.msg(t.msg)
          }),
            a("input[name='lotM']").bind('input propertychange', function () {
              var t = a(this)
                .val()
                .replace(/[^0-9.]/gi, '')
              ;((function (t, e) {
                var a = new RegExp(e, 'g'),
                  n = t.match(a)
                return n ? n.length : 0
              })(t, '[.]') > 1
                ? a(this).val(t.substring(0, t.lastIndexOf('.')))
                : a(this).val(t),
                h())
            }),
            a("input[name='posi']").bind('input propertychange', function () {
              var t = a(this)
                .val()
                .replace(/[^0-9]/gi, '')
              a(this).val(t)
            }),
            o(e))
        } else
          n('<div class="closed">已封盘</div>').render(t, function (t) {
            ;(layui.main.container.content.html(t), l.render())
          })
      },
      changeTypeDt: function (t) {
        ;(a('#lotTCount').text(0), a('#lotTMoney').text(0), a("input[name='lotM']").val(''), a('.bgcolor-yellow').removeClass('bgcolor-yellow'), a(t).addClass('text-7a023c'), a(t).siblings().removeClass('text-7a023c'), (e = a(t).attr('data')))
        var n = {
          smallType: layui.dict.bigType2NumberDes(e)
        }
        ;(i.post('member/odds/two', n, function (t) {
          if (200 === t.code) {
            var e = {},
              a = 0,
              i = layui.dict.bigType2locationTypeDes(n.smallType),
              l = 1e4 * layui.dict.maxOddsDict[i]
            ;((e.list = t.data.reduce(function (t, e, n) {
              return (
                n > 0 && n % 10 == 0 && a++,
                t[a] || (t[a] = []),
                t[a].push({
                  lotNum: e.betNo,
                  odds: e.odds,
                  lotOdds: l,
                  highlightFlag: e.highlightFlag
                }),
                t
              )
            }, [])),
              r(e),
              s(t.change))
          } else layui.utils.msg(t.msg)
        }),
          o(e))
      },
      colSelect: function (t) {
        for (var e = a(t).index(), n = a('#etby').find('tr'), i = 0; i < n.length; i++)
          a(n[i])
            .find('td:eq(' + e + ')')
            .attr('class')
            .indexOf('bgcolor-yellow') > 0
            ? a(n[i])
                .find('td:eq(' + e + ')')
                .removeClass('bgcolor-yellow')
            : a(n[i])
                .find('td:eq(' + e + ')')
                .addClass('bgcolor-yellow')
        h()
      },
      rowSelect: function (t) {
        for (var e = a(t).parent().find('td:gt(0)'), n = 0; n < e.length; n++) a(e[n]).attr('class').indexOf('bgcolor-yellow') > 0 ? a(e[n]).removeClass('bgcolor-yellow') : a(e[n]).addClass('bgcolor-yellow')
        h()
      },
      posiLotOther: function (t) {
        ;(a(t).attr('class').indexOf('bgcolor-yellow') > 0 ? a(t).removeClass('bgcolor-yellow') : a(t).addClass('bgcolor-yellow'), p())
      },
      posiLot: function (t) {
        ;(a(t).attr('class').indexOf('bgcolor-yellow') > 0 ? a(t).removeClass('bgcolor-yellow') : a(t).addClass('bgcolor-yellow'), p())
      },
      heOther: function (t) {
        ;(a(t).attr('class').indexOf('bgcolor-yellow') > 0 ? a(t).removeClass('bgcolor-yellow') : a(t).addClass('bgcolor-yellow'), p())
      },
      heFen: function (t) {
        ;(a(t).attr('class').indexOf('bgcolor-yellow') > 0 ? a(t).removeClass('bgcolor-yellow') : a(t).addClass('bgcolor-yellow'), p())
      },
      tdSelect: function (t) {
        ;(a(t).attr('class').indexOf('bgcolor-yellow') > 0 ? a(t).removeClass('bgcolor-yellow') : a(t).addClass('bgcolor-yellow'), h())
      },
      lotNum: function (t) {
        var n = a('#etby').find('td').filter('.bgcolor-yellow')
        if (n.length > 0 || ('' != a('#ptSecond').val() && '' != a('#ptFirst').val())) {
          var l = []
          if ('' != a("input[name='lotM']").val() && 1 * a("input[name='lotM']").val()) {
            var r = a("input[name='lotM']").val()
            if (1 * r <= 0) return (layui.utils.msg('投注金额不能小于等于0'), !1)
            n.length > 0 &&
              a.each(n, function (t, e) {
                l.push(a(e).find('.pdl5').text())
              })
            var o = (function (t, a) {
              ;((t = f(t)), (a = f(a)))
              for (var n = [], i = 0; i < t.length; i++)
                for (var l = e.replace('口', t[i]), r = 0; r < a.length; r++) {
                  var o = l.replace('口', a[r])
                  n.push(o)
                }
              return n
            })(a('#ptFirst').val(), a('#ptSecond').val())
            ;((l = l.concat(o)), a('#repeat').prop('checked') && (l = c(l)))
            var s = []
            a.each(l, function (t, e) {
              var a = {}
              ;((a.nm = e), s.push(a))
            })
            ;(a(layui.main.container.surp).text(), l.length, layui.utils.numFormat(r * s.length, 2, !1))
            var p = a(layui.main.container.lttnum).filter(':first').text()
            if (a(t).attr('autoTask'))
              return (
                a.each(s, function (t, e) {
                  e.am = r
                }),
                layui.chaseNumber.addChaseNumber(s),
                !1
              )
            i.post({
              url: 'member/bet/doOrder',
              data: {
                ock: layui.utils.guid().replace(/-/g, 'f'),
                betNoList: s.map(function (t) {
                  return {
                    bn: t.nm,
                    am: r
                  }
                }),
                orderWays: 2,
                stageNo: p
              },
              type: 'POST',
              isSystemHandle: !1,
              dataType: 'JSON',
              success: function (t) {
                if (t.successCode > 0) (layui.main.showUnprint(), layui.main.initUserInfo(), a('#childMenu').find('li:eq(4)').find('a').click(), layui.main.palyAudio('success'))
                else {
                  var e = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                  ;(layui.utils.msg(e), layui.main.palyAudio('fail'), t.msg && layui.utils.msg(t.msg + '<br>' + e))
                }
                u()
              },
              error: function () {
                layui.utils.msg('系统繁忙，请稍后再试!')
              }
            })
          } else layui.utils.msg('请输入正确金额!')
        } else layui.utils.msg('请选择号码!')
      },
      cancle: u
    })
  }),
  layui.define(function (t) {
    var e = layui.jquery,
      a = layui.laytpl,
      n = layui.utils,
      i = layui.form
    t('lotOne', {
      render: function () {
        var t = {}
        'open' === layui.main.container.status
          ? a(
              '<form class="layui-form"><table class="table table-lotTwo table-bd mg0" border="1"><thead><tr class="bgcolor-success"><th width="33%">口XX</th><th width="33%">X口X</th><th width="33%">XX口</th></tr></thead><tbody id="showData"></tbody><tfoot><tr><td><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,0);">单</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,0);">双</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,0);">大</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,0);">小</button></td><td><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,1);">单</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,1);">双</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,1);">大</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,1);">小</button></td><td><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,2);">单</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,2);">双</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,2);">大</button><button type="button" lay-filter="" class="layui-btn layui-btn-primary lotOne-btn" name="sele" onclick="layui.lotOne.tbSelect(this,2);">小</button></td></tr><tr><td colspan="5"><div class="pd5"><b class="font-xlarge mgt5 layui-inline">金额：</b><div class="layui-input-inline"><input type="text" name="lotMoy" lay-verify="required" value="" class="layui-input font-wght input-large font-xlarge set-w120" /></div><button class="font-xlarge pd5 mgl15" lay-submit="" lay-filter="submitPro">下注</button><button type="button" class="font-xlarge pd5 mgl15" onclick="layui.lotOne.lotCancle();">取消</button>\x3c!-- <button type="button" autoTask="1" class="font-xlarge pd5 mgl15" lay-submit lay-filter="submitPro">追号</button> --\x3e</div></td></tr></tfoot></table></form>'
            ).render(t, function (l) {
              ;(layui.main.container.content.html(l),
                i.render(),
                n.post('member/odds/one', void 0, function (n) {
                  if (200 === n.code) {
                    var i = 0,
                      l = layui.dict.locationType2BigTypesDes(1).map(function (t) {
                        return layui.dict.bigTypeDes(t)
                      }),
                      r = {}
                    ;(l.map(function (t) {
                      r[t] = []
                    }),
                      (t.rMap = n.data.reduce(function (t, e, a) {
                        return (
                          a > 0 && a % 10 == 0 && i++,
                          t[l[i]].push({
                            lotNum: e.betNo,
                            odds: e.odds,
                            lotOdds: 10,
                            highlightFlag: e.highlightFlag
                          }),
                          t
                        )
                      }, r)),
                      a(
                        '{{# layui.each(d.rMap.X口X,function(index,it){ }}<tr><td class="tdcursor" onclick="layui.lotOne.tdSelect(this)"><b class="pdl5 font16 num-left">{{d.rMap.口XX[index].lotNum}}</b><b class="pdr5 odd-right {{ d.rMap.口XX[index].highlightFlag ? "text-blue" : "text-red" }} text-red" name="odds">{{d.rMap.口XX[index].odds}}</b></td><td class="tdcursor" onclick="layui.lotOne.tdSelect(this)"><b class="pdl5 font16 num-left">{{d.rMap.X口X[index].lotNum}}</b><b class="pdr5 odd-right {{ d.rMap.X口X[index].highlightFlag ? "text-blue" : "text-red" }} text-red" name="odds">{{d.rMap.X口X[index].odds}}</b></td><td class="tdcursor" onclick="layui.lotOne.tdSelect(this)"><b class="pdl5 font16 num-left">{{d.rMap.XX口[index].lotNum}}</b><b class="pdr5 odd-right {{ d.rMap.XX口[index].highlightFlag ? "text-blue" : "text-red" }} text-red" name="odds">{{d.rMap.XX口[index].odds}}</b></td></tr>{{# }); }}'
                      ).render(t, function (t) {
                        e('#showData').html(t)
                      }))
                  }
                }),
                i.on('submit(submitPro)', function (t) {
                  if ('' != e("input[name='lotMoy']").val() && 1 * e("input[name='lotMoy']").val()) {
                    var a = e("input[name='lotMoy']").val()
                    if (1 * a <= 0) return (layui.utils.msg('投注金额不能小于等于0'), !1)
                    var i = e('#showData .bgcolor-yellow')
                    if (i.length > 0) {
                      var l = [],
                        r = (e("input[name='lotMoy']").val(), '')
                      e.each(i, function (t, a) {
                        var n = {},
                          i = e(a).find('b:eq(0)').text()
                        n.nm = i
                        var o = i.replace(/[0-9]/gi, '口')
                        ;(r.indexOf(o) < 0 && (r += '##' + o), l.push(n))
                      })
                      ;(l.length, layui.utils.numFormat(a * l.length, 2, !1))
                      var o = e(layui.main.container.lttnum).filter(':first').text()
                      r.replace('##', '').split('##')
                      if (t.elem.getAttribute('autoTask'))
                        return (
                          e.each(l, function (t, e) {
                            e.am = 1e4 * a
                          }),
                          layui.chaseNumber.addChaseNumber(l),
                          !1
                        )
                      n.post({
                        url: 'member/bet/doOrder',
                        data: {
                          ock: layui.utils.guid().replace(/-/g, 'f'),
                          betNoList: l.map(function (t) {
                            return {
                              bn: t.nm,
                              am: a
                            }
                          }),
                          orderWays: 1,
                          stageNo: o
                        },
                        type: 'POST',
                        isSystemHandle: !1,
                        dataType: 'JSON',
                        success: function (t) {
                          if (t.successCode > 0) {
                            ;(layui.main.showUnprint(), layui.main.initUserInfo())
                            var a = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                            ;(layui.main.palyAudio('success'), e("input[name='ltMoy']").val(''), e('#childMenu').find('li:eq(4)').find('a').click())
                          } else {
                            a = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                            ;(layui.utils.msg(a), layui.main.palyAudio('fail'), t.msg && layui.utils.msg(t.msg + '<br>' + a))
                          }
                        },
                        error: function () {
                          layui.utils.msg('系统繁忙，请稍后再试!')
                        }
                      })
                    } else layui.utils.msg('请选择要下注的号码!')
                  } else layui.utils.msg('请输入正确金额!')
                  return !1
                }),
                e("input[name='lotMoy']").bind('input propertychange', function (t) {
                  var a = e(this)
                    .val()
                    .replace(/[^0-9.]/gi, '')
                  ;(e(this).val(a.substring(0, a.lastIndexOf('.'))), e(this).val(a))
                }))
            })
          : a('<div class="closed">已封盘</div>').render(t, function (t) {
              ;(layui.main.container.content.html(t), i.render())
            })
      },
      tbSelect: function (t, a) {
        ;(e(t).attr('class').indexOf('bgcolor-yellow') > 0 ? e(t).removeClass('bgcolor-yellow') : e(t).addClass('bgcolor-yellow'),
          (function (t, a) {
            var n = e(t).parent().find("button[name='sele']").filter('.bgcolor-yellow'),
              i = ''
            ;(e.each(n, function (t, a) {
              i += e(a).text()
            }),
              (i.indexOf('单') >= 0 && i.indexOf('双') >= 0) || (i.indexOf('大') >= 0 && i.indexOf('小') >= 0)
                ? e('#showData')
                    .find('tr')
                    .find('td:eq(' + a + ')')
                    .addClass('bgcolor-yellow')
                : 1 == i.length
                  ? (e('#showData')
                      .find('tr')
                      .find('td:eq(' + a + ')')
                      .removeClass('bgcolor-yellow'),
                    '大' == i
                      ? e('#showData')
                          .find('tr:gt(4)')
                          .find('td:eq(' + a + ')')
                          .addClass('bgcolor-yellow')
                      : '小' == i
                        ? e('#showData')
                            .find('tr:lt(5)')
                            .find('td:eq(' + a + ')')
                            .addClass('bgcolor-yellow')
                        : '单' == i
                          ? e('#showData')
                              .find('tr:odd')
                              .find('td:eq(' + a + ')')
                              .addClass('bgcolor-yellow')
                          : '双' == i &&
                            e('#showData')
                              .find('tr:even')
                              .find('td:eq(' + a + ')')
                              .addClass('bgcolor-yellow'))
                  : 2 == i.length
                    ? (e('#showData')
                        .find('tr')
                        .find('td:eq(' + a + ')')
                        .removeClass('bgcolor-yellow'),
                      i.indexOf('单') >= 0 && i.indexOf('小') >= 0
                        ? e('#showData')
                            .find('tr:lt(5),tr:odd')
                            .find('td:eq(' + a + ')')
                            .addClass('bgcolor-yellow')
                        : i.indexOf('单') >= 0 && i.indexOf('大') >= 0
                          ? e('#showData')
                              .find('tr:gt(4),tr:odd')
                              .find('td:eq(' + a + ')')
                              .addClass('bgcolor-yellow')
                          : i.indexOf('双') >= 0 && i.indexOf('小') >= 0
                            ? e('#showData')
                                .find('tr:lt(5),tr:even')
                                .find('td:eq(' + a + ')')
                                .addClass('bgcolor-yellow')
                            : i.indexOf('双') >= 0 &&
                              i.indexOf('大') >= 0 &&
                              e('#showData')
                                .find('tr:gt(4),tr:even')
                                .find('td:eq(' + a + ')')
                                .addClass('bgcolor-yellow'))
                    : e('#showData')
                        .find('tr')
                        .find('td:eq(' + a + ')')
                        .removeClass('bgcolor-yellow'))
          })(t, a))
      },
      lotCancle: function () {
        ;(e('tbody').find('tr').find('td').removeClass('bgcolor-yellow'), e('tfoot').find('tr').find('button').removeClass('bgcolor-yellow'), e("input[name='lotMoy']").val(''))
      },
      tdSelect: function (t) {
        e(t).attr('class').indexOf('bgcolor-yellow') > 0 ? e(t).removeClass('bgcolor-yellow') : e(t).addClass('bgcolor-yellow')
      }
    })
  }),
  layui.define(function (t) {
    var e = layui.jquery,
      a = layui.laytpl,
      n = layui.utils,
      i = layui.form
    function l(t) {
      ;(e(t).addClass('active'), e(t).siblings().removeClass('active'))
      var n = e(t).attr('data')
      ;(e(t).parent().siblings().find('input').removeClass('active'),
        (function (t) {
          var n = 2
          n = 'one' == t ? 1 : 'two' == t ? 2 : 'three' == t ? 3 : 4
          var l = layui.gamemiddle.kxcontent(n)
          a(l).render({}, function (t) {
            ;(e('#kx_content').html(t), layui.gamemiddle.kuaiXuanClick(), i.render())
          })
        })(n))
    }
    t('quickSelectForHn5', {
      render: function () {
        var t = {}
        ;('open' == layui.main.container.status
          ? a(
              '<div class="qs-left"><div class="panel panel-success"><div class="panel-heading"><div class="panel-title text-center">生成号码框</div></div><div class="panel-body num-box pd0"><table class="table mg0" width="100%" border="1"><tbody id="proNums"></tbody></table></div></div><div class="panel panel-success mg0"><div class="panel-heading"><div class="panel-title text-center">发送框</div></div><div class="panel-body"><div class="layui-inline"><b class="font-xlarge mgt5 layui-inline">金额：</b><div class="layui-input-inline mgr10"><input type="text" name="ltMoy" autocomplete="off" maxlength="8" lay-verify="required"class="layui-input font-wght input-large font-xlarge set-w90" /></div><div class="layui-inline mgr10"><button type="button" class="layui-btn" onclick="layui.quickSelectForHn5.sureLotNum(this);"lay-filter="submitBtn" id="submitBtn">下注</button></div>\x3c!-- <div class="layui-inline mgr10"><button type="button" class="font-xlarge pd5" onclick="layui.quickSelect.sureLotNum(this);" autoTask="1" lay-filter="submitBtn">追号</button></div> --\x3e<b class="mgl15">笔数：<span name="lotTCount">0</span></b><b class="mgl15">金额：<span name="lotTMoney">0</span></b></div></div></div></div><form class="layui-form"><div class="qs-right pull-right"><table class="table" border="1"><thead><tr><td colspan="5" id="type"><a href="javascript:void(0);" class="odd-type-btn" onclick="layui.quickSelectForHn5.changTy(this);"data="one">一字定</a><a href="javascript:void(0);" class="odd-type-btn" onclick="layui.quickSelectForHn5.changTy(this);"data="two">二字定</a><a href="javascript:void(0);" class="odd-type-btn" onclick="layui.quickSelectForHn5.changTy(this);"data="three">三字定</a>\x3c!-- <a href="javascript:void(0);" class="odd-type-btn" onclick="layui.quickSelectForHn5.changTy(this);" data="four">四字定</a> --\x3e\x3c!-- <a href="javascript:void(0);" class="odd-type-btn" onclick="layui.quickSelect.changTy(this);" data="tappear">二字现</a><a href="javascript:void(0);" class="odd-type-btn" onclick="layui.quickSelect.changTy(this);" data="thappear">三字现</a><a href="javascript:void(0);" class="odd-type-btn" onclick="layui.quickSelect.changTy(this);" data="frappear">四字现</a><a href="javascript:void(0);" class="odd-type-btn" onclick="layui.quickSelect.changTy(this);" data="fivePos">头尾四五定</a> --\x3e</td></tr></thead>\x3c!-- 定方式 --\x3e<tbody id="kx_content"></tbody></table><div class="text-center">\x3c!-- <button class="font-xlarge pd5 mgr10" lay-submit="" lay-filter="submitPro">生成</button><button type="button" id="over" class="font-xlarge pd5" onclick="layui.quickSelect.resetLot();" lay-filter="">复位</button><button type="reset" id="reset" class="" style="display: none" hidden lay-filter="">复位</button> --\x3e</div></div></form>'
            ).render(t, function (t) {
              ;(layui.main.container.content.html(t), i.render())
            })
          : a('<div class="closed">已封盘</div>').render(t, function (t) {
              ;(layui.main.container.content.html(t), i.render())
            }),
          e('input[name=ltMoy]').on('keyup', function (t) {
            var a = e(this).val(),
              i = a.replace(/[^0-9.]/gi, '')
            ;(isNaN(i) && (i = i.substring(0, i.lastIndexOf('.'))), e(this).val(i))
            var l = e("span[name='lotTCount']").text()
            ;(e("span[name='lotTMoney']").text(n.numFormat(l * i, 2, !1)), 13 == t.keyCode && '' != a && (e(this).blur(), e('#submitBtn').click()))
          }),
          e('#type').find('a:eq(1)').click())
      },
      changTy: function (t) {
        var a = e('#proNums').find('td').length,
          n = -1
        ;(1 == a && (n = e('#proNums').find('td').text().indexOf('号码')),
          a > 0 && n < 0
            ? layui.utils.confirm(
                '生成数据还没有下注，确定要切换菜单吗?',
                function () {
                  l(t)
                },
                '确认'
              )
            : l(t))
      },
      sureLotNum: function (t) {
        var a = e('#proNums').find('td'),
          i = e("input[name='ltMoy']").val()
        if (1 * i <= 0) return (layui.utils.msg('投注金额不能小于等于0'), !1)
        if (a.length < 1) layui.utils.msg('请选择号码')
        else if (isNaN(1 * i)) layui.utils.msg('请输入正确金额')
        else {
          var l = (function () {
              if (void 0 === window.localStorage) {
                var t = function (t) {
                    var e = new Date()
                    ;(e.setDate(e.getDate() - 1), userdataobj.load(t), (userdataobj.expires = e.toUTCString()), userdataobj.save(t))
                  },
                  e = document.body || document.getElementsByTagName('head')[0] || document.documentElement
                return (
                  (userdataobj = document.createElement('input')),
                  (userdataobj.type = 'hidden'),
                  userdataobj.addBehavior('#default#userData'),
                  e.appendChild(userdataobj),
                  {
                    setItem: function (t, e) {
                      ;(userdataobj.load(t), userdataobj.setAttribute(t, e))
                      var a = new Date()
                      ;(a.setDate(a.getDate() + 700), (userdataobj.expires = a.toUTCString()), userdataobj.save(t), userdataobj.load('userdata_record'))
                      var n = userdataobj.getAttribute('userdata_record')
                      ;(null == n && (n = ''), (n = n + t + ','), userdataobj.setAttribute('userdata_record', n), userdataobj.save('userdata_record'))
                    },
                    getItem: function (t) {
                      return (userdataobj.load(t), userdataobj.getAttribute(t))
                    },
                    removeItem: function (e) {
                      ;(userdataobj.load(e), t(e), userdataobj.load('userdata_record'))
                      var a = userdataobj.getAttribute('userdata_record'),
                        n = new RegExp(e + ',', 'g')
                      a = a.replace(n, '')
                      var i = new Date()
                      ;(i.setDate(i.getDate() + 700), (userdataobj.expires = i.toUTCString()), userdataobj.setAttribute('userdata_record', a), userdataobj.save('userdata_record'))
                    },
                    clear: function () {
                      userdataobj.load('userdata_record')
                      var e = userdataobj.getAttribute('userdata_record').split(',')
                      for (var a in e) '' != e[a] && t(e[a])
                      t('userdata_record')
                    }
                  }
                )
              }
              return window.localStorage
            })(),
            r = JSON.stringify(undefined),
            o = new Date().getTime()
          if (l.getItem('lttNumLot') == r && null != l.getItem('lotTime') && o - l.getItem('lotTime') < 2e3) layui.utils.msg('重复号码，请检查是否要再次下注')
          else {
            var s = ''
            if (e(t).attr('autoTask')) {
              var u = []
              return (
                e.each(a, function (t, a) {
                  var n = {},
                    i = e(a).text()
                  n.nm = i
                  var l = i.replace(/[0-9]/gi, '口')
                  ;(s.indexOf(l) < 0 && (s += '##' + l), u.push(n))
                }),
                e.each(u, function (t, e) {
                  e.am = 1e4 * i
                }),
                layui.chaseNumber.addChaseNumber(u),
                !1
              )
            }
            ;(a.length, layui.utils.numFormat(a.length * i, 2, !1), (u = []))
            if (
              (e.each(a, function (t, a) {
                var n = {},
                  i = e(a).text()
                n.nm = i
                var l = i.replace(/[0-9]/gi, '口')
                ;(s.indexOf(l) < 0 && (s += '##' + l), u.push(n))
              }),
              1 * e(layui.main.container.curr).text() < i * u.length)
            )
              return (layui.utils.msg('当前信用额度不够'), !1)
            var p,
              d = e(layui.main.container.lttnum).filter(':first').text(),
              c = s.replace('##', '').split('##'),
              f = !0
            if (
              (e.each(c, function (t, a) {
                var n = !1
                if (
                  (e.each(undefined, function (t, e) {
                    if (e.BLCODE == a) return ((p = e.BASE), (1e4 * i) / p > Math.floor((1e4 * i) / p) && ((f = !1), (n = !0)), !1)
                  }),
                  n)
                )
                  return !1
              }),
              !f)
            )
              return (layui.utils.msg('递增基数为' + layui.utils.numFormat(p, 2)), !1)
            n.post({
              url: 'member/bet/doOrder',
              data: {
                ock: layui.utils.guid().replace(/-/g, 'f'),
                betNoList: u.map(function (t) {
                  return {
                    bn: t.nm,
                    am: i
                  }
                }),
                orderWays: 4,
                stageNo: d
              },
              type: 'POST',
              isSystemHandle: !1,
              dataType: 'JSON',
              beforeSend: function () {
                ;(l.setItem('lttNumLot', r),
                  l.setItem('lotTime', o),
                  layer.load(2, {
                    time: 0,
                    shade: 0.01
                  }))
              },
              success: function (t) {
                if (t.successCode > 0) {
                  ;(layui.main.showUnprint(), layui.main.initUserInfo())
                  var l = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                  ;(layui.main.palyAudio('success'), e("input[name='ltMoy']").val(''))
                } else {
                  l = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                  ;(layui.utils.msg(l), layui.main.palyAudio('fail'), t.msg && layui.utils.msg(t.msg + '<br>' + l))
                }
                !(function (t, e, a, i) {
                  var l = layui.gamemiddle.getProLog()
                  t.failCode > 0 && t.successCode > 0 ? (l += ',笔数:' + a + ',成功:' + t.successCode + ',失败:' + t.failCode + ',注单:' + e) : (l += ',笔数:' + a + ',成功:' + t.successCode + ',注单:' + e)
                  n.post({
                    url: 'member/logs/addQuickSelectLog',
                    data: {
                      stageNo: i,
                      content: l
                    },
                    type: 'POST',
                    isSystemHandle: !1,
                    dataType: 'JSON',
                    success: function () {
                      ;((l = ''), layui.gamemiddle.reset())
                    }
                  })
                })(t, i, a.length, d)
              },
              error: function () {
                layui.utils.msg('系统繁忙，请稍后再试!')
              }
            })
          }
        }
      }
    })
  }),
  layui.define(function (t) {
    var e,
      a,
      n = layui.jquery,
      i = layui.laytpl,
      l = layui.utils,
      r = layui.form,
      o = 0,
      s =
        '<table class="table mg0" border="1"><thead><tr><th>期号</th><th>号码</th></tr></thead><tbody>{{# var dlotMy=0; }}{{# layui.each(d.list,function(index,item){}}<tr><td>{{item.stageNo}}</td><td><i class="lot-num">{{item.openNumber}}</i></td></tr>{{# }); }}{{# if(d.list.length<1){ }}{{# for(var i=0;i<4;i++){ }} <tr><td>-</td><td>-</td></tr>{{# } }}{{# } }}</tbody></table>',
      u =
        '{{# layui.each(d.list,function(index,item){ }}{{# if(item.ordStat==2){ }}<tr class="row-red" name="have">{{# }else{ }}<tr class="" name="have">{{# } }}<td name="blcode">{{item.stName}}</td><td>{{item.batId}}</td><td class="font-wght text-green">{{layui.utils.numHandel(item.betNo)}}</td><td class="font-wght">{{item.odds}}</td><td>{{item.amt}}</td>{{# if(item.ordStat==2){ }}<td name="statu">退码</td><td>--</td></tr>{{# }else{ }}{{# if(item.ordStat==1){ }}<td name="statu">正常</td><td><input type="checkbox" name="sel" lay-skin="primary" value="{{item.ordId}}" ></td></tr>{{# }else{ }}<td name="statu">正常</td><td>--</td></tr>{{# } }}{{# } }}</tr>{{# }); }}{{# if(d.list.length<1){ }}{{# for(var i=0;i<10;i++){ }}<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>{{# } }}{{# } }}'
    function p(t) {
      var e = {
        betNo: t
      }
      l.post('member/odds/oddsAndMaxReceive', e, function (t) {
        ;(n('#numOdds').text(t.data.odds), n('#canLot').text(t.data.maxReceive))
      })
    }
    function d() {
      l.post('member/orders/stop', '', function (t) {
        if (200 === t.code) {
          e = t.data
          var a = {}
          ;((a.list = t.data),
            (o = t.data.length),
            i(
              '<table class="table mg0" border="1"><thead><tr><th>号码</th><th>金额</th><th><input type="checkbox" name="dAll" lay-skin="primary" lay-filter="dAll" title="全选" /></th></tr></thead><tbody>{{# var lotMy=0; }}{{# layui.each(d.list,function(index,item){}}{{# lotMy=lotMy+item.amt }}<tr><td>{{- layui.utils.numHandel(item.betNo) }}</td><td>{{item.amt}}</td><td><input type="checkbox" value="{{item.id}}" lay-skin="primary" name="stop" title="" /></td></tr>{{# }); }}{{# if(d.list.length<1){ }}{{# for(var i=0;i<4;i++){ }}<tr name="stop"><td>-</td><td>-</td><td>-</td></tr>{{# } }}{{# }else{ }}<tr><td colspan="3"><button type="button" class="layui-btn layui-btn-warm layui-btn-small" onclick="layui.quickType.exportTxt();">导出txt</button></td></tr>{{# } }}</tbody></table>'
            ).render(a, function (t) {
              n('#stop').html(t)
            }),
            n("input[type='checkbox'][name='dAll']").prop('checked', !1),
            r.render(),
            o < 1 ? n('#down').prop('disabled', !0) : n('#down').prop('disabled', !1),
            r.on('checkbox(dAll)', function (t) {
              ;(n('#stop').find("input[type=checkbox][name='stop']").prop('checked', t.elem.checked), r.render('checkbox'))
            }),
            r.on('submit(lotPrint)', function () {
              return (
                null == e ||
                  0 == e.length ||
                  (function (t) {
                    var e = []
                    ;(e.push('<!DOCTYPE html>'),
                      e.push('<html lang="en">'),
                      e.push('<head>'),
                      e.push('<meta charset="utf-8">'),
                      e.push('<style type="text/css">*{clear:both; background-color:#ffffff; font: 15px/1.5 Arial, simsun, sans-serif; -webkit-font-smoothing:antialiased; }</style>'),
                      e.push('</head>'),
                      e.push('<body>'),
                      e.push('\t\t<table width="95%" border="1" cellspacing="0" cellpadding="1">'),
                      e.push('\t\t\t<thead>'),
                      e.push('\t\t\t\t<tr>'),
                      e.push('\t\t\t\t\t<td style="text-align: center;">号码</td>'),
                      e.push('\t\t\t\t\t<td style="text-align: center;">金额</td>'),
                      e.push('\t\t\t\t</tr>'),
                      e.push('\t\t\t</thead>'),
                      e.push('\t\t\t<tbody>'),
                      n.each(t, function (t, a) {
                        ;(e.push('\t\t\t\t<tr>'), e.push('\t\t\t\t\t<td style="text-align: center;">' + a.BETNUM + '</td>'), e.push('\t\t\t\t\t<td style="text-align: center;">' + a.AMOUNT + '</td>'), e.push('\t\t\t\t</tr>'))
                      }),
                      e.push('\t\t\t</tbody>'),
                      e.push('\t\t</table>'),
                      e.push('</body>'),
                      e.push('</html>'),
                      layui.utils.print(e.join('')))
                  })(e),
                !1
              )
            }))
        }
      })
    }
    function c(t, e) {
      var a = new RegExp(e, 'g'),
        n = t.match(a)
      return n ? n.length : 0
    }
    function f(t) {
      for (var e = [], a = 0; a < t.length; a++) e.push(t.charAt(a))
      return e
    }
    function f(t) {
      for (var e = [], a = 0; a < t.length; a++) e.push(t.charAt(a))
      return e
    }
    t('quickType', {
      render: function () {
        var t,
          e = {}
        ;('open' == layui.main.container.status
          ? (i(
              '<form class="layui-form"><div class="qt-left"><div class="panel panel-success"><div class="panel-heading"><div class="panel-title text-center">下注框</div></div><div class="panel-body pd0"><table class="table mg0 table-hover" border="1"><thead><tr><th width="15%">彩种</th><th width="15%">注单编号</th><th>号码</th><th>赔率</th><th>金额</th><th>状态</th><th width="15%"><input type="checkbox" name="tAll" lay-skin="primary" lay-filter="tAll" title="全选" /><button type="button" class="" name="" onclick="turnLot(this);">退码</button></th></tr></thead><tbody id="quick"></tbody></table></div></div><div class="panel panel-success quickType mgt10"><div class="panel-heading"><div class="panel-title">\x3c!-- <input type="checkbox" lay-skin="primary" value="get" lay-filter="selType" name="appearOrfullTurn">&nbsp;全转 --\x3e<span class="mgl30"><input type="radio" name="alse" class="mgr15" value="allTurn" lay-filter="alse" title="全转" />&nbsp;\x3c!-- <input type="radio" name="alse" class="mgr15" value="four" lay-filter="alse" title="四字现">&nbsp;<input type="radio" name="alse" class="mgr15" value="ffive" lay-filter="alse" title="XXX口口(4,5位)">&nbsp;<input type="radio" name="alse" class="mgr15" value="ofive" lay-filter="alse" title="口XXX口(1,5位)">&nbsp;<input type="radio" name="alse" class="mgr15" value="five" lay-filter="alse" title="五位二定">&nbsp; --\x3e<input type="radio" name="alse" class="mgr15" value="none" lay-filter="alse" title="无" checked />&nbsp;</span></div></div><div class="panel-body"><div class="layui-inline"><b class="font-xlarge mgt5 layui-inline">号码：</b><div class="layui-input-inline"><input type="text" id="lotNum" maxlength="5" name="lotNum" lay-verify="required" autocomplete="off" value="" class="layui-input font-wght input-large font-xlarge set-w120" /></div></div><div class="layui-inline mgl15"><b class="font-xlarge mgt5 layui-inline">金额：</b><div class="layui-input-inline"><input type="text" id="lotMy" maxlength="8" name="lotMy" lay-verify="required" autocomplete="off" value="" class="layui-input font-wght input-large font-xlarge set-w120" /></div></div><div class="layui-inline mgl15"><button class="font-xlarge pd5" type="button" id="sureLot" lay-submit="" lay-filter="sureLot">确定下注</button></div>\x3c!-- <div class="layui-inline mgl15"><button class="font-xlarge pd5" type="button" id="sureLot" autoTask="1" lay-submit="" lay-filter="sureLot">追号</button></div> --\x3e<b class="mgl15">赔率：<span class="text-red" id="numOdds">0</span></b><b class="mgl15">可下：<span class="text-red" id="canLot">0</span></b></div></div></div></form><form class="layui-form"><div class="qt-right"><div class="panel panel-success"><div class="panel-heading"><div class="panel-title text-center">开奖号码</div></div><div class="panel-body pd0" id="lottery"></div></div><div class="panel panel-success"><div class="panel-heading"><div class="panel-title text-center">目前停押号码</div></div><div class="panel-body pd0" id="stop"></div></div></div></form>'
            ).render(e, function (t) {
              ;(layui.main.container.content.html(t), r.render(), r.render('radio'))
            }),
            (t = window.screen.height),
            n('.qt-right').prop('height', t),
            l.post('member/orders/kd', '', function (t) {
              if (200 === t.code) {
                var e = {}
                e.list = t.data
                var l = n(layui.main.container.lttnum).filter(':first').text()
                ;((a = l),
                  i(u).render(e, function (t) {
                    n('#quick').html(t)
                  }),
                  n("input[type='checkbox'][name='tAll']").prop('checked', !1),
                  r.render('checkbox'),
                  r.render('radio'))
              }
            }),
            d(),
            l.post('member/index/open/list', '', function (t) {
              if (200 === t.code) {
                var e = {}
                ;((e.list = t.data),
                  i(s).render(e, function (t) {
                    n('#lottery').html(t)
                  }))
              }
            }))
          : i('<div class="closed">已封盘</div>').render(e, function (t) {
              ;(layui.main.container.content.html(t), r.render())
            }),
          r.on('checkbox(selType)', function (t) {
            t.elem.checked && (n(this).siblings().prop('checked', !1), r.render())
          }),
          r.on('radio(alse)', function (t) {
            t.elem.checked && (n('#lotNum').val(''), r.render())
          }),
          r.on('checkbox(tAll)', function (t) {
            ;(n('#quick').find("input[type=checkbox][name='sel']").prop('checked', t.elem.checked), r.render('checkbox'))
          }),
          n('#lotMy').bind('input propertychange', function (t) {
            var e = n(this)
              .val()
              .replace(/[^0-9.]/gi, '')
            c(e, '[.]') > 1 ? n(this).val(e.substring(0, e.lastIndexOf('.'))) : n(this).val(e)
          }),
          n('#lotMy').on('keyup', function (t) {
            if (13 == t.keyCode) return (n('#sureLot').click(), n('#lotNum').focus(), !1)
            8 == t.keyCode && '' == n(this).val() && (n(this).blur(), n('#lotNum').focus(), n('#lotNum').select())
          }),
          n('#lotMy').on('focus', function () {
            n("input[type='radio']:checked").val()
          }),
          n('#lotNum').on('blur', function (t) {
            n("input[type='radio']:checked").val()
            var e = n(this).val()
            if (3 == e.length) c(e, 'X') < 5 && p((e = e.replace(/[^0-9X]/g, 'X')))
            else if (e.length > 1 && e.length < 4 && c(e, 'X') < 1) {
              p('A' + f(e).sort().join(''))
            }
          }),
          n('#lotNum').on('keyup', function (t) {
            if (13 == t.keyCode) return (n('#lotMy').select(), !1)
          }),
          n('#lotNum').bind('input propertychange', function (t) {
            var e = n(this)
              .val()
              .replace(/[^0-9X]/gi, 'X')
              .toUpperCase()
            ;(e.length >= 2 && c(e, 'X') > 2 && (e = e.substring(0, e.length - 1)), n(this).val(e), 3 == e.length && c(e, 'X') < 3 && (n('#lotMy').select(), p(e)))
          }),
          r.on('submit(sureLot)', function (t) {
            var e = {},
              i = []
            if (1 * t.field.lotMy <= 0) return (layui.utils.msg('投注金额不能小于等于0'), !1)
            if (3 != t.field.lotNum.length) return (layui.utils.msg('下注号码不正确'), !1)
            if ('allTurn' == t.field.alse) {
              if (3 != t.field.lotNum.length) return (layui.utils.msg('下注号码不正确'), !1)
              var o = (function (t) {
                for (var e = [], a = f(t), n = '', i = 0; i < a.length; i++)
                  for (var l = 0; l < a.length; l++)
                    for (var r = 0; r < a.length; r++) {
                      if (i != l && l != r && r != i) n += '##' + [a[i], a[l], a[r]].join('')
                    }
                '' != n && '##' != n && (e = n.replace('##', '').split('##'))
                return (function (t) {
                  for (var e = [], a = '', n = 0; n < t.length; n++) a.indexOf(t[n]) < 0 && (a += '##' + t[n])
                  '' != a && '##' != a && (e = a.replace('##', '').split('##'))
                  return e
                })(e)
              })(t.field.lotNum)
              n.each(o, function (t, e) {
                var a = {}
                ;((a.nm = e), i.push(a))
              })
            } else {
              if (!(3 === t.field.lotNum.length && c(t.field.lotNum, 'X') < 3)) return (layui.utils.msg('下注号码格式不正确'), !1)
              ;((e.nm = t.field.lotNum), (e.am = t.field.lotMy), i.push(e))
            }
            if (1 * n(layui.main.container.curr).text() < t.field.lotMy * i.length) return (layui.utils.msg('当前信用额度不够'), !1)
            ;(i.length, layui.utils.numFormat(1e4 * t.field.lotMy * i.length, 2, !1))
            n('#lotNum').val('')
            var s = t.field.lotMy,
              u = {
                ock: layui.utils.guid().replace(/-/g, 'f'),
                orderWays: 3,
                betNoList: i.map(function (t) {
                  return {
                    bn: t.nm,
                    am: s
                  }
                }),
                stageNo: a
              }
            return t.elem.getAttribute('autoTask')
              ? (n.each(i, function (e, a) {
                  a.am = t.field.lotMy
                }),
                layui.chaseNumber.addChaseNumber(i),
                !1)
              : (l.post({
                  url: 'member/bet/doOrder',
                  data: u,
                  type: 'POST',
                  isSystemHandle: !1,
                  success: function (t) {
                    if ((n('#lotNum').val(''), t.failList && t.failList.length > 0 && (d(), t.sci && JSON.parse(t.sci).length < 1 && layui.main.palyAudio('fail')), t.ordersInfoList && t.ordersInfoList.length > 0))
                      (!(function (t) {
                        t.length > 0 && layui.main.palyAudio('success')
                        t.length < 10
                          ? n('#quick').find('tr').length >= 10 &&
                            n('#quick')
                              .find('tr:lt(' + t.length + ')')
                              .remove()
                          : (n('#quick tr').remove(), (t = t.slice(0, 10)))
                        var e = []
                        ;(n.each(t, function (t, a) {
                          var n = '<tr class="" name="have">'
                          ;(a.locationType,
                            (n += '<td name="blcode">' + a.stName + '</td>'),
                            (n += '<td>' + a.batId + '</td>'),
                            (n += '<td class="font-wght text-green">' + layui.utils.numHandel(a.betNo) + '</td>'),
                            (n += '<td class="font-wght">' + a.odds + '</td>'),
                            (n += '<td>' + a.amt + '</td>'),
                            (n += '<td name="statu">正常</td><td><input type="checkbox" name="sel" lay-skin="primary" value="' + a.ordId + '" ></td>'),
                            (n += '</tr>'),
                            e.push(n))
                        }),
                          t.length < 10 ? n('#quick').find('tr:last').after(e.join('')) : n('#quick').html(e.join('')))
                        r.render()
                      })(t.ordersInfoList),
                        (function (t, e) {
                          var a = layui.main.container.pnum
                          if ('' == n.trim(a.text()) || 1 == a.attr('data-printed')) return (layui.main.showUnprint(), !1)
                          var i = [],
                            l = 1 * n('#lotCount').text(),
                            r = 1 * n('#lotMoney').text()
                          if (
                            (n.each(t, function (t, a) {
                              var n = '<tr data="' + a.ordId + '">'
                              ;((n += '<td>' + layui.utils.numHandel(a.betNo) + '</td>'), (n += '<td>1:' + a.odds + '</td>'), (n += '<td>' + a.amt + '</td>'), (n += '</tr>'), i.push(n), l++, (r = layui.utils.numFormat(1e4 * (1 * r + 1 * e), 2)))
                            }),
                            n('#idxBy').find('tr').length + t.length <= 500)
                          )
                            n('#idxBy').append(i.join(''))
                          else {
                            var o = n('#idxBy').find('tr').length + t.length - 500
                            ;(n('#idxBy')
                              .find("tr:lt('" + o + "')")
                              .remove(),
                              n('#idxBy').append(i.join('')))
                          }
                          ;(n('#lotCount').text(l), n('#lotMoney').text(r), n('#side-left').scrollTop(n('#side-left')[0].scrollHeight))
                        })(t.ordersInfoList, s),
                        (function (t) {
                          if (!t) return !1
                          ;(n('#surp').text(t.totalLimit), n('#huse').text(t.usedLimit), n('#curr').text(t.remainingLimit))
                        })(t.membersLimit))
                    else {
                      var e = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                      ;(layui.utils.msg(e), layui.main.palyAudio('fail'), t.msg && layui.utils.msg(t.msg + '<br>' + e))
                    }
                  },
                  complete: function () {
                    ;(n('#numOdds').text(0), n('#canLot').text(0))
                  }
                }),
                !1)
          }))
      },
      turnLot: function (t) {
        var e = n("input[name='sel']:checked")
        if (0 != e.length) {
          var i = '一共' + e.length + '笔注码，确认退码吗?'
          layui.utils.confirm(
            i,
            function () {
              for (var t = [], i = 0; i < e.length; i++)
                if (n(e[i]).prop('checked')) {
                  var o = n(e[i]).val()
                  t.push(o)
                }
              var s = {
                ids: t.join(','),
                stageNo: a
              }
              l.post('member/orders/orderRefund', s, function (t) {
                200 === t.code
                  ? (layui.main.initUserInfo(),
                    layui.utils.success('退码成功！！'),
                    n.each(e, function (t, e) {
                      ;(n(e).parents('tr').addClass('row-red bgcolor-gray'), n(e).parents('tr').find("td[name='statu']").html('退码'), n(e).parents('tr').find("td[name='statu']").next().html('--'))
                    }),
                    n("input[type='checkbox'][name='tAll']").prop('checked', !1),
                    r.render('checkbox'),
                    layui.main.showUnprint())
                  : layui.utils.msg('退码失败！！')
              })
            },
            '退码'
          )
        } else layui.utils.msg('请选择要退码的号码！')
      },
      delStopNum: delStopNum,
      exportTxt: function (t) {
        if (o < 1) return !1
        var e = n('<form>')
        ;(e.attr('style', 'display:none'), e.attr('target', ''), e.attr('method', 'post'), e.attr('action', '/member/orders/stopTxt'), n('body').append(e), e.submit(), e.remove())
      }
    })
  }),
  layui.define(function (t) {
    var e =
      '{{# layui.each(d.list, function(index, item){ }}<tr><td width="15%">{{ item.openTime || "--" }}</td><td width="10%">{{ item.stageNo }}</td>{{# if(item.status!==1){ }}<td><span class="ball {{item.status===-1?\'ball-gray\':\'ball-red\'}}">--</span></td><td><span class="ball {{item.status===-1?\'ball-gray\':\'ball-red\'}}">--</span></td><td><span class="ball {{item.status===-1?\'ball-gray\':\'ball-red\'}}">--</span></td><td><span class="ball {{item.status===-1?\'ball-gray\':\'ball-red\'}}">--</span></td><td><span class="ball {{item.status===-1?\'ball-gray\':\'ball-red\'}}">--</span></td><td><span class="ball {{item.status===-1?\'ball-gray\':\'ball-red\'}}">--</span></td><td><span class="ball {{item.status===-1?\'ball-gray\':\'ball-red\'}}">--</span></td><td><span class="ball {{item.status===-1?\'ball-gray\':\'ball-red\'}}">--</span></td>{{# }else{ }}<td><span class="ball ball-blue">{{item.hundred}}</span></td><td><span class="ball ball-blue">{{item.ten}}</span></td><td><span class="ball ball-blue">{{item.bit}}</span></td><td><span>{{item.totalSum }}</span></td>{{# if(item.totalSum>=14){ }}<td><span class="text-red">大</span></td>{{# }else{ }}<td><span>小</span></td>{{# } }}{{# if(item.totalSum % 2 == 0){ }}<td><span class="text-red">双</span></td>{{# }else{ }}<td><span>单</span></td>{{# } }}{{# if(item.hundred > item.bit){ }}<td><span class="row-red">龙</span></td>{{# }else if(item.hundred < item.bit){ }}<td><span>虎</span></td>{{# }else{ }}<td><span class="text-blue">和</span></td>{{# } }}{{# if(item.ysSum % 4 == 0){ }}<td><span>{{item.ysSum}} = 4</span></td>{{# }else{ }}<td><span>{{item.ysSum}} = {{  item.ysSum % 4}}</span></td>{{# } }}{{# } }}</tr>{{# }) }}{{#if(d.list.length === 0){ }}<tr><td colspan="13">暂时没有开奖号码</td></tr>{{# } }}'
    t('lottery', {
      render: function t(a, n) {
        a = a || {}
        var i = layui.utils.getDate().replace(/-/g, ''),
          l = {}
        ;((l.current = a['paramMap.pageNum'] || 1),
          (l.size = a['paramMap.pageSize'] || 20),
          (l.stage = a['paramMap.lttnum'] || i),
          (l.stageNo = a['paramMap.num'] ? a['paramMap.num'] : void 0),
          layui.utils.post('member/settingStage/page', l, function (i) {
            var r = {}
            ;((r.list = i.data.row.map(function (t) {
              return ((t.totalSum = t.hundred + t.ten + t.bit), (t.ysSum = t.ten + '' + t.bit), t)
            })),
              (r.dateListStr = layui.utils.getMonthDay(!0).join('')),
              (r.lttTimeListStr = i.data.stageNos.map(function (t) {
                return '<option value="'.concat(t, '">').concat(t, '</option>')
              })),
              n ||
                layui
                  .laytpl(
                    '<div class="bgcolor-white"><form><div class="panel panel-success"><div class="panel-heading"><div class="panel-title">检索条件</div></div><div class="panel-body"><div class="layui-inline"><label class="layui-form-label">日期：</label><div class="layui-input-inline set-w130  layui-form"><select id="j-lttnum">{{- d.dateListStr }}</select></div></div><div class="layui-inline"><label class="layui-form-label">期号：</label><div class=" layui-input-inline set-w150 layui-form"><select id="ltttime"><option value="all">全部</option>{{- d.lttTimeListStr }}</select></div></div><button class="layui-btn layui-btn-small mgl15" lay-submit="" lay-filter="submitBtn">&nbsp;查询</button></div></div></form><table class="table table-bd mg0 table-hover" border="1"><thead class="bgcolor-success"><tr><th>开奖时间</th><th>期号</th><th>佰</th><th>拾</th><th>个</th><th colspan="3">总合</th><th>龙虎和</th><th>番</th></tr></thead><tbody id="cd_tbody"></tbody></table><div class="bg-white clearfix pdl15 pdr15"><div id="page" class="pull-right"></div></div></div>'
                  )
                  .render(r, function (e) {
                    ;(layui.main.container.content.html(e),
                      layui.form.render('select'),
                      layui.form.on('submit(submitBtn)', function (e) {
                        var a = layui.$('#j-lttnum').val(),
                          n = layui.$('#ltttime').val()
                        return ((e.field['paramMap.lttnum'] = a), 'all' != n && (e.field['paramMap.num'] = n), t(e.field, !0), !1)
                      }))
                  }),
              (function (t) {
                layui.laytpl(e).render(t, function (t) {
                  layui.$('#cd_tbody').html(t)
                })
              })(r),
              layui.laypage.render({
                elem: 'page',
                curr: l.current,
                count: i.data.rowCount,
                limit: l.size,
                limits: [10, 20, 30, 50, 100, 200],
                layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
                jump: function (e, n) {
                  n || ((a['paramMap.pageNum'] = e.curr), (a['paramMap.pageSize'] = e.limit), (a['paramMap.lttnum'] = layui.$('#j-lttnum').val()), t(a, !0))
                }
              }),
              (function (t) {
                layui.differenceTime || (layui.differenceTime = 0)
                if (t.next2) {
                  var e = 6e5,
                    a = new Date(t.next2.LTTTIME.replace(/\-/g, '/')).getTime()
                  new Date().getTime() + layui.differenceTime - a > e && alert(t.next2.LTTNUM + ' 期官网至今未开出号码，请您先不要投注。耐心等待 或 联系上线处理，给您带来的不便，我们深表歉意！')
                }
              })(i))
          }))
      }
    })
  }),
  layui.define(function (t) {
    var e,
      a,
      n,
      i = layui.jquery,
      l = layui.laytpl,
      r = layui.utils,
      o = layui.form,
      s =
        '<div class="panel-heading"><div class="panel-title">文件明细</div></div><div class="panel-body pd0"><div class="text-center pdb10" style="margin-top: 10px"><button type="button" lay-filter="" id="submit" class="layui-btn layui-btn-warm layui-btn-small mgr10">确定下注</button>\x3c!-- <button type="button" lay-filter="" autoTask="1" id="submit" class="layui-btn layui-btn-danger layui-btn-small mgr10">追号</button> --\x3e<b class="mgr10">笔数：<span id="lCount">{{d.dMap.length}}</span></b><b>金额：<span id="lotMy">{{layui.utils.numFormat(int,2,false)}}</span></b></div><table class="table table-bd" border="1"><thead><tr><th>号码</th><th>金额</th><th class="bgcolor-gray">号码</th><th class="bgcolor-gray">金额</th><th>号码</th><th>金额</th><th class="bgcolor-gray">号码</th><th class="bgcolor-gray">金额</th><th>号码</th><th>金额</th></tr></thead><tbody id="showTex">{{# var int=0; }}{{# if(d.dMap.length>0){ }}{{# if(d.dMap.length%5!=0){ }}{{# layui.each(d.dMap,function(idx,item){ }}{{# if(idx==0){ }}<tr><td>{{ item.key }}</td><td name="amount">{{item.val}}</td>{{# }else if(idx%5==0){ }}</tr><tr><td>{{ item.key }}</td><td name="amount">{{item.val}}</td>{{# }else{ }}<td>{{ item.key }}</td><td name="amount">{{item.val}}</td>{{# } }}{{# int=int+item.val }}{{# });}}{{# if(d.dMap.length%5>0){ }}{{# for(var i=0;i<(5-d.dMap.length%5);i++){ }}<td></td><td></td>{{# } }}{{# } }}</tr>{{# }else{ }}{{# layui.each(d.dMap,function(idx,item){ }}{{# if(idx==0){ }}<tr><td>{{ item.key }}</td><td name="amount">{{item.val}}</td>{{# }else if(idx%5==0){ }}</tr><tr><td>{{ item.key }}</td><td name="amount">{{item.val}}</td>{{# }else{ }}<td>{{ item.key }}</td><td name="amount">{{item.val}}</td>{{# }}}{{# int=int+item.val }}{{# }); }}{{# } }}{{# }else{ }}</tr><tr><td colspan="10">没有符合的号码</td></tr>{{# } }}<tr style="display: none"><td><input type="text" id="mys" value="{{layui.utils.numFormat(int,2,false)}}" /></td></tr></tbody></table></div>',
      u =
        '<div class="panel-heading"><div class="panel-title">文件明细</div></div><div class="panel-body pd0"><div class="text-center pdb10" style="margin-top: 10px"><div class="layui-inline mgr10">金额&nbsp;<div class="layui-input-inline"><input type="text" name="lotMey" value="" autocomplete="off" lay-verify="required" maxlength="7" class="layui-input set-w90" /></div></div><button type="button" lay-filter="" id="submit" class="layui-btn layui-btn-warm layui-btn-small mgr10">确定下注</button>\x3c!-- <button type="button" lay-filter="" autoTask="1" id="submit" class="layui-btn layui-btn-danger layui-btn-small mgr10">追号</button> --\x3e<b class="mgr10">笔数：<span id="lCount">{{d.dMap.length}}</span></b><b>金额：<span id="lotMy"></span></b></div><table class="table table-bd" border="1"><thead><tr><th>号码</th><th class="bgcolor-gray">号码</th><th>号码</th><th class="bgcolor-gray">号码</th><th>号码</th><th class="bgcolor-gray">号码</th><th>号码</th><th class="bgcolor-gray">号码</th><th>号码</th><th class="bgcolor-gray">号码</th></tr></thead><tbody id="showTex">{{# if(d.dMap.length>0){ }}{{# if(d.dMap.length%10!=0){ }}{{# layui.each(d.dMap,function(idx,item){ }}{{# if(idx==0){ }}<tr><td>{{ item.key }}</td>{{# }else if(idx%10==0){ }}</tr><tr><td>{{ item.key }}</td>{{# }else{ }}<td>{{ item.key }}</td>{{# }}}{{# });}}{{# if(d.dMap.length%10>0){ }}{{# for(var i=0;i<(10-d.dMap.length%10);i++){ }}<td></td>{{# } }}{{# }}}</tr>{{# }else{ }}{{# layui.each(d.dMap,function(idx,item){ }}{{# if(idx==0){ }}<tr><td>{{ item.key }}</td>{{# }else if(idx%10==0){ }}</tr><tr><td>{{ item.key }}</td>{{# }else{ }}<td>{{ item.key }}</td>{{# }}}{{# });}}</tr>{{# } }}{{# }else{ }}<tr><td colspan="10">没有符合的号码</td></tr>{{# } }}</tbody></table></div>'
    t('txtImport', {
      render: function () {
        var t,
          p = {}
        ;('open' == layui.main.container.status
          ? l(
              '<div class="panel panel-success" id="append"><div class="panel-heading"><div class="panel-title">txt导入</div></div><div class="panel-body"><div><b class="mgl10">格式A</b>：号码&nbsp;&nbsp;号码&nbsp;&nbsp;号码&nbsp;&nbsp;<b class="mgl15">格式B</b>：号码=金额&nbsp;&nbsp;号码=金额&nbsp;&nbsp;号码=金额</div><hr /><form class="layui-form" id="form" method="POST" enctype="multipart/form-data"><div class="pd5"><b>文件上传：</b><div class="layui-inline upload-div"><button>选择文件</button><input type="file" name="file" id="fup" value="" accept="text/plain" /></div><button type="button" id="fileUp" lay-submit="" lay-filter="fileUp" class="btn btn-bg">上传</button></div></form></div></div><div class="panel panel-warm" hidden id="lm"></div>'
            ).render(p, function (t) {
              layui.main.container.content.html(t)
            })
          : l('<div class="closed">已封盘</div>').render(p, function (t) {
              ;(layui.main.container.content.html(t), o.render())
            }),
          layui.upload.render({
            elem: '#fup',
            url: 'member/orders/txt',
            auto: !1,
            exts: 'txt',
            accept: 'txt',
            bindAction: '#fileUp',
            done: function (o) {
              if ((layer.close(t), 200 === o.code)) {
                e = o.data.includes('=') ? null : 'show'
                var p = {},
                  d = []
                ;(o.data.split(',').forEach(function (t) {
                  var a = _slicedToArray('show' === e ? [t] : t.split('='), 2),
                    n = a[0],
                    i = a[1],
                    l = void 0 === i ? 0 : i
                  p[n] ? (p[n] += l) : (p[n] = Number(l))
                }),
                  Object.keys(p).forEach(function (t) {
                    d.push({
                      key: t,
                      val: Number(p[t].toFixed(2))
                    })
                  }),
                  (a = (o = {
                    type: e,
                    dMap: d
                  }).dMap),
                  (function (t) {
                    'show' == t.type
                      ? l(u).render(t, function (t) {
                          ;(i('#lm').html(t), i('#lm').show())
                          var e = i('#showTex tr')
                          i.each(e, function (t, e) {
                            ;(i(e).find('td:eq(2)').addClass('bgcolor-gray'), i(e).find('td:eq(3)').addClass('bgcolor-gray'), i(e).find('td:eq(6)').addClass('bgcolor-gray'), i(e).find('td:eq(7)').addClass('bgcolor-gray'))
                          })
                        })
                      : l(s).render(t, function (t) {
                          ;(i('#lm').html(t), i('#lm').show())
                          var e = i('#showTex tr')
                          ;(i.each(e, function (t, e) {
                            i(e).find('td:even').addClass('bgcolor-gray')
                          }),
                            i('#lotMy').text(i('#mys').val()))
                        })
                    ;(i('input[name=lotMey]').bind('input propertychange', function () {
                      var t = i(this)
                        .val()
                        .replace(/[^0-9.]/gi, '')
                      if (new RegExp(/^[0-9]+([.][0-9])?$/).test(t)) {
                        i(this).val(t)
                        e = layui.utils.numFormat(t * i('#lCount').text() * 1, 2, !1)
                        i('#lotMy').text(e)
                      } else {
                        ;((t =
                          (function (t, e) {
                            var a = new RegExp(e, 'g'),
                              n = t.match(a)
                            return n ? n.length : 0
                          })(t, '[.]') > 1
                            ? t.substring(0, t.lastIndexOf('.'))
                            : t.substring(0, t.indexOf('.') > 0 ? t.indexOf('.') + 2 : t.length)),
                          i(this).val(t))
                        var e = layui.utils.numFormat(t * i('#lCount').text() * 1, 2, !1)
                        i('#lotMy').text(e)
                      }
                    }),
                      i('[id=submit]').click(function () {
                        if ('show' == e && ('' == i('input[name=lotMey]').val() || i('input[name=lotMey]').val().trim().length < 1)) return (layui.utils.msg('请输入投注金额'), !1)
                        var t,
                          l = []
                        if ('show' == e) {
                          var o = i('input[name=lotMey]').val()
                          if (1 * o <= 0) return (layui.utils.msg('投注金额不能小于等于0'), !1)
                          ;(i.each(a, function (t, e) {
                            var a = {}
                            ;(e.key.indexOf('A') >= 0 || 3 == e.key.length ? (a.bn = e.key) : (a.bn = e.key + 'X'), (a.am = o), l.push(a))
                          }),
                            l.length * o)
                        } else
                          i.each(a, function (t, e) {
                            var a = {}
                            ;(e.key.indexOf('A') >= 0 || 3 == e.key.length ? (a.bn = e.key) : (a.bn = e.key + 'X'), (a.am = e.val), e.val, l.push(a))
                          })
                        var s = !0
                        if (
                          (i.each(l, function (e, a) {
                            var l = ''
                            l = a.bn.indexOf('A') >= 0 ? a.bn.replace(/[0-9]/gi, 'A') : a.bn.replace(/[0-9]/gi, '口')
                            var r = !1
                            if (
                              (i.each(n, function (e, n) {
                                if (n.BLCODE == l) {
                                  t = layui.utils.numFormat(n.BASE, 2)
                                  var i = layui.utils.numFormat(a.am, 2)
                                  return (layui.utils.numFormat((1e3 * i) / (1e3 * t), 3, !1) != Math.floor((1e3 * i) / (1e3 * t)) && ((s = !1), (r = !0)), !1)
                                }
                              }),
                              r)
                            )
                              return !1
                          }),
                          !s)
                        )
                          return (layui.utils.msg('递增基数为' + t), !1)
                        if (i(this).attr('autoTask')) return (layui.chaseNumber.addChaseNumber(l), !1)
                        var u = {},
                          p = i(layui.main.container.lttnum).filter(':first').text()
                        ;((u.betNoList = l),
                          (u.orderWays = 6),
                          (u.stageNo = p),
                          (u.ock = layui.utils.guid().replace(/-/g, 'f')),
                          r.post({
                            url: 'member/bet/doOrder',
                            data: u,
                            type: 'POST',
                            isSystemHandle: !1,
                            dataType: 'JSON',
                            success: function (t) {
                              if (t.successCode > 0) {
                                ;(layui.main.showUnprint(), layui.main.initUserInfo())
                                var e = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                                ;(i('#childMenu').find('li:eq(2)').find('a').click(), i("input[name='lotMey']").val(''), i('#lm').html(''), i('#lm').hide(), i('#fup').val(''), layui.main.palyAudio('success'))
                              } else {
                                e = '下注成功：' + t.successCode + '注,失败' + t.failCode + '注!!!'
                                ;(layui.utils.msg(e), layui.main.palyAudio('fail'), t.msg && layui.utils.msg(t.msg + '<br>' + e))
                              }
                            },
                            error: function () {
                              layui.utils.msg('系统繁忙，请稍后再试!')
                            }
                          }))
                      }))
                  })(o))
              } else 602 == o.code ? layui.main.doLayout() : layui.utils.msg(o.msg)
            },
            before: function () {
              if ('' == i('#fup').val()) return (layui.utils.msg('请选择上传的txt文件!'), !1)
              t = layer.load(2, {
                time: 1e5,
                shade: 0.01
              })
            },
            error: function (e, a) {
              ;(layer.close(t), layui.utils.msg('网络繁忙，请稍后再试!'))
            }
          }))
      }
    })
  }),
  layui.define(function (t) {
    t('lotteryRule', {
      render: function () {
        layui
          .laytpl(
            '<div class="panel panel-success"><div class="panel-heading"><div class="panel-title text-center">加拿大28规则说明</div></div><div class="panel-body rule-content"><h3 class="rule-title">本站销售<span class="text-pink">加拿大28</span>规则</h3><p><b>&nbsp;&nbsp;第一章&nbsp;&nbsp;总&nbsp;&nbsp;则</b></p><p><b>&nbsp;&nbsp;&nbsp;&nbsp;第一条&nbsp;&nbsp;</b>根据财政部《彩票发行与销售管理暂行规定》以及彩票发行管理中心有关规则,结合计算机网络技术和数字型彩票的特点，结合《数字型电脑福利彩票游戏规则》之相关条款,制定本游戏规则。</p><p><b>&nbsp;&nbsp;&nbsp;&nbsp;第二条&nbsp;&nbsp;</b>本站彩票实行自愿购买,量力而行;凡下注者即被视为同意并遵守规则。</p><p><b>&nbsp;&nbsp;第二章&nbsp;&nbsp;游戏方法</b></p><p><b>&nbsp;&nbsp;&nbsp;&nbsp;第三条&nbsp;&nbsp;</b></b></p><p>&nbsp;&nbsp;本站采用<span class="text-pink">加拿大PC28</span>的开奖号码作为本站的开奖号码。</p><p>&nbsp;&nbsp;"三位数"的每注彩票由000-999中的任意3位自然数排列而成。</p><div class="pdl15"><p><b class="text-pink">假设下列为开奖结果:</b></p><table class="table table-bd" border="1" style="width: 300px;"><tbody><tr><td width="30">佰</td><td width="30">拾</td><td width="30">个</td></tr><tr><td>3</td><td>4</td><td>5</td></tr></tbody></table><p>依照开奖结果,中奖范例如下：</p><p>三字定中奖：</p><p class="text-pink">345</p><p>二字定中奖：</p><p class="text-pink">X45; 3X5; 34X;</p><p>一字定中奖：</p><p class="text-pink">3XX; X4X; XX5;</p><p>大小单双龙虎和：</p><p class="text-pink">第一球特~第三球特：第一球特、第二球特、第三球特：指下注的每一球特与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。</p><p class="text-pink">单双大小：根据相应单项投注第一球特 ~ 第三球特开出的球号，判断胜负。</p><p class="text-pink">单双：根据相应单项投注的第一球特 ~ 第三球特开出的球号为双数叫特双，如2、6；特码为单数叫特单，如1、3。</p><p class="text-pink">大小：根据相应单项投注的第一球特 ~ 第三球特开出的球号大于或等于5为特码大，小于或等于4为特码小。</p><p class="text-pink">总和单双大小：</p><p class="text-pink">单双：根据相应单项投注的第一球特 ~ 第三球特开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。</p><p class="text-pink">大小：根据相应单项投注的第一球特 ~ 第三球特开出的球号大于或等于14为特码大，小于或等于13为特码小</p><p class="text-pink">龙虎和：</p><p class="text-pink">第一球大于第三球则是龙</p><p class="text-pink">第一球小于第三球则是虎</p><p class="text-pink">第一球等于第三球则是和</p><p>番摊：</p><p class="text-pink">开奖号码的拾位和个位组合，例如 开奖345，((4 拼 5) = 45) / 4 馀数为1;  则 番数为1</p><table class="table table-bd" border="1" style="width: 100%;"><tbody><tr><td width="80">正</td><td class="text-left"><p>于自1~4任选1号进行投注，当开奖结果与所选的号码相同时，即为中奖。</p><p>开出号码加总除四馀数为1，中奖为1，不中奖为3，其他视为和局；</p><p>开出号码加总除四馀数为2，中奖为2，不中奖为4，其他视为和局；</p><p>开出号码加总除四馀数为3，中奖为3，不中奖为1，其他视为和局；</p><p>开出号码加总除四馀数为0，中奖为4，不中奖为2，其他视为和局。</p></td></tr><tr><td width="80">番</td><td class="text-left"><p>于自1~4任选1号进行投注，当开奖结果与所选的号码相同时，即为中奖。</p><p>开出号码加总除四馀数为1，中奖为1，其他视为不中奖；</p><p>开出号码加总除四馀数为2，中奖为2，其他视为不中奖；</p><p>开出号码加总除四馀数为3，中奖为3，其他视为不中奖；</p><p>开出号码加总除四馀数为0，中奖为4，其他视为不中奖。</p></td></tr><tr><td width="80">角</td><td class="text-left"><p>于自1-2，2-3，3-4，1-4任选1个进行投注，当开奖结果与所选的号码相同时，即为中奖。</p><p>开出号码加总除四馀数为1，中奖为1-2角、1-4角，其他视为不中奖；</p><p>开出号码加总除四馀数为2，中奖为2-3角、1-2角，其他视为不中奖；</p><p>开出号码加总除四馀数为3，中奖为2-3角、3-4角，其他视为不中奖；</p><p>开出号码加总除四馀数为0，中奖为1-4角、3-4角，其他视为不中奖。</p></td></tr><tr><td width="80">念</td><td class="text-left"><p>于自A念B，任选1个进行投注，当开奖结果与A号码相同时，即为中奖，当开奖结果与B号码时，则为和局，其他视为不中奖。</p><p>开出号码加总除四馀数为1，中奖为1念2、1念3、1念4，和局为2念1、3念1、4念1，其他视为不中奖；</p><p>开出号码加总除四馀数为2，中奖为2念1、2念3、2念4，和局为1念2、3念2、4念2，其他视为不中奖；</p><p>开出号码加总除四馀数为3，中奖为3念1、3念2、3念4，和局为1念3、2念3、4念3，其他视为不中奖；</p><p>开出号码加总除四馀数为0，中奖为4念1、4念2、4念3，和局为1念4、2念4、3念4，其他视为不中奖。</p></td></tr><tr><td width="80">单、双</td><td class="text-left"><p>于自单或双任选1个进行投注，当开奖结果为单数则单数中奖，其他视为不中奖。当开奖结果为双数则双数中奖，其他视为不中奖。</p></td></tr><tr><td width="80">大、小</td><td class="text-left"><p>小：开12视为中奖，其他视为不中奖；大：开34视为中奖，其他视为不中奖。</p></td></tr><tr><td width="80">三门</td><td class="text-left"><p>投注三个号码，开出为赢，其馀为输</p></td></tr><tr><td width="80">通</td><td class="text-left"><p>投注两个号码，开出为赢，其馀两个号码自由选定一和、一输。例如: 下 一通23，开23为赢、开1为输、开4为和</p></td></tr></tbody></table></div><p><b>&nbsp;&nbsp;第三章&nbsp;&nbsp;开奖及公告</b></p><p><b>&nbsp;&nbsp;&nbsp;&nbsp;第四条&nbsp;&nbsp;</b>“加拿大28” 每天开奖402次，开奖结果由官方网站提供。</p><p><b>&nbsp;&nbsp;&nbsp;&nbsp;第五条&nbsp;&nbsp;</b>每期开奖后，以网络向投注终端发布中奖号码和开奖结果号码为准。</p><p><b>&nbsp;&nbsp;第四章&nbsp;&nbsp;附则</b></p><p><b>&nbsp;&nbsp;&nbsp;&nbsp;第六条&nbsp;&nbsp;</b>本游戏规则最终解释权归本公司。</p></div></div>'
          )
          .render({}, function (t) {
            layui.main.container.content.html(t)
          })
      }
    })
  }),
  layui.define('form', function (t) {
    t('dayStatement', {
      render: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = layui.main.container.content
        e.html('<div class="panel panel-success"><div class="panel-heading"><div class="panel-title clearfix"><div class="pull-left font-wght">日报表&nbsp;&nbsp;<span id="dayDate"></span></div></div></div><div id="tpList" class="panel-body pd0"></div></div>')
        var a = t['paramMap.dayDate'] || layui.utils.getDate()
        layui.$('#dayDate', e).text(a)
        var n = {
          stage: a.replace(/-/g, '')
        }
        layui.utils.post('member/report/day', n, function (t) {
          ;(layui
            .laytpl(
              '<table class="table mg0 table-bd table-hover" border="1"><thead><tr><th class="bgcolor-gray">期号</th><th class="bgcolor-ffffc4">笔数</th><th class="bgcolor-ffffc4">金额</th><th class="bgcolor-ffffc4">回水</th><th class="bgcolor-ffffc4">中奖</th><th class="bgcolor-ffffc4">盈亏</th></tr></thead><tbody>{{# d.cnts=d.ams1s=d.yk1s=d.funds=d.bnss=0 }}{{# layui.each(d.data,function(i,item){ }}{{# d.cnts += item.orderMemberOrders }}{{# d.ams1s += item.orderMemberTotalAmt * 1e4 }}{{# d.funds += item.memberReturnAmt * 1e4 }}{{# d.bnss += item.memberBonusAmt * 1e4 }}{{# d.yk1s += item.ykAmt * 1e4}}<tr><td class="bgcolor-gray"><a href="" name="ltn" data-ltt="{{item.stageNo}}" data-ltn="{{item.stageNo}}" class="text-hyperlink">{{"[ "+(1+i)+" ] "}}({{item.stageNo}})</a></td><td class="bgcolor-ffffc4">{{item.orderMemberOrders}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.orderMemberTotalAmt,1,false)}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.memberReturnAmt,1,false)}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.memberBonusAmt,1,false)}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.ykAmt,1,false)}}</td></tr>{{# }) }}</tbody><tfoot class="bgcolor-ceffe7"><tr class=""><td><b>合计</b></td><td><b>{{d.cnts}}</b></td><td><b>{{layui.utils.numFormat(d.ams1s,1)}}</b></td><td><b>{{layui.utils.numFormat(d.funds,1)}}</b></td><td><b>{{layui.utils.numFormat(d.bnss,1)}}</b></td><td><b>{{layui.utils.numFormat(d.yk1s,1)}}</b></td></tr></tfoot></table>'
            )
            .render(t, function (t) {
              layui.$('#tpList', e).html(t)
            }),
            layui.$('a[name=ltn]', e).click(function (t) {
              ;(layui.stope(t), t.preventDefault())
              var e = this
              layui.use('orderDetail', function (t) {
                t.render({
                  'paramMap.lttnum': e.getAttribute('data-ltn')
                })
              })
            }))
        })
      }
    })
  }),
  layui.define(function (t) {
    t('monthStatement', {
      render: function (t) {
        var e = layui.main.container.content
        ;(e.html('<div class="panel panel-success"><div class="panel-heading"><div class="panel-title clearfix"><div class="pull-left font-wght">月报表</div></div></div><div id="tpList" class="panel-body pd0"></div></div>'),
          layui.utils.post('member/report/month', t, function (t) {
            ;(layui
              .laytpl(
                '<table class="table table-bd mg0 table-hover" border="1"><thead><tr><th class="bgcolor-gray">日期</th><th class="bgcolor-ffffc4">笔数</th><th class="bgcolor-ffffc4">金额</th><th class="bgcolor-ffffc4">回水</th><th class="bgcolor-ffffc4">中奖</th><th class="bgcolor-ffffc4">盈亏</th></tr></thead><tbody>{{# d.cnts=d.ams1s=d.yk1s=0,d.funds=0,d.bnss=0 }}{{# layui.each(d.data,function(i,item){ }}{{# d.cnts += item.orderMemberOrders }}{{# d.ams1s += item.orderMemberTotalAmt * 1e4 }}{{# d.funds += item.memberReturnAmt * 1e4 }}{{# d.bnss += item.memberBonusAmt * 1e4 }}{{# d.yk1s += item.ykAmt * 1e4}}<tr><td class="bgcolor-gray"><a href="" name="lttDate" data-ltt-date="{{layui.utils.formatDate(item.stage)}}" class="text-hyperlink">{{"[ "+(i+1)+" ] "}}({{layui.utils.formatDate(item.stage)}})</a></td><td class="bgcolor-ffffc4">{{item.orderMemberOrders}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.orderMemberTotalAmt,1,false)}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.memberReturnAmt,1,false)}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.memberBonusAmt,1,false)}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.ykAmt,1,false)}}</td></tr>{{# }) }}</tbody><tfoot class="bgcolor-ceffe7"><tr class=""><td><b>合计</b></td><td><b>{{d.cnts}}</b></td><td><b>{{layui.utils.numFormat(d.ams1s,1)}}</b></td><td><b>{{layui.utils.numFormat(d.funds,1)}}</b></td><td><b>{{layui.utils.numFormat(d.bnss,1)}}</b></td><td><b>{{layui.utils.numFormat(d.yk1s,1)}}</b></td></tr></tfoot></table>;'
              )
              .render(t, function (t) {
                layui.$('#tpList', e).html(t)
              }),
              layui.$('a[name=lttDate]', e).click(function (e) {
                ;(layui.stope(e), e.preventDefault())
                var a = this
                layui.use('dayStatement', function (e) {
                  e.render({
                    'paramMap.dayDate': a.getAttribute('data-ltt-date'),
                    'paramMap.userId': t.upId
                  })
                })
              }))
          }))
      }
    })
  }),
  layui.define(function (t) {
    function e(t) {
      var e = layui.main.container.content,
        a = {
          startStage: t['paramMap.startDate'].replace(/-/g, ''),
          endStage: t['paramMap.endDate'].replace(/-/g, '')
        }
      layui.utils.post('member/report/week', a, function (t) {
        ;(layui
          .laytpl(
            '<table class="table mg0 table-bd table-hover" border="1"><thead><tr><th class="bgcolor-gray">日期</th><th class="bgcolor-ffffc4">笔数</th><th class="bgcolor-ffffc4">金额</th><th class="bgcolor-ffffc4">回水</th><th class="bgcolor-ffffc4">中奖</th><th class="bgcolor-ffffc4">盈亏</th></tr></thead><tbody>{{# d.cnts=d.ams1s=d.yk1s=d.funds=d.bnss=0 }}{{# layui.each(d.data,function(i,item){ }}{{# d.cnts += item.orderMemberOrders }}{{# d.ams1s += item.orderMemberTotalAmt * 1e4 }}{{# d.funds += item.memberReturnAmt * 1e4 }}{{# d.bnss += item.memberBonusAmt * 1e4 }}{{# d.yk1s += item.ykAmt * 1e4 }}<tr><td class="bgcolor-gray"><a href="" name="lttDate" data-ltt="{{item.ltt}}" data-lttDate="{{layui.utils.formatDate(item.stage)}}" class="text-hyperlink">{{"[ "+(i+1)+" ] "}}({{layui.utils.formatDate(item.stage)}})</a></td><td class="bgcolor-ffffc4">{{item.orderMemberOrders}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.orderMemberTotalAmt,1,false)}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.memberReturnAmt,1,false)}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.memberBonusAmt,1,false)}}</td><td class="bgcolor-ffffc4">{{layui.utils.numFormat(item.ykAmt,1,false)}}</td></tr>{{# }) }}</tbody><tfoot class="bgcolor-ceffe7"><tr class=""><td><b>合计</b></td><td><b>{{d.cnts}}</b></td><td><b>{{layui.utils.numFormat(d.ams1s,1)}}</b></td><td><b>{{layui.utils.numFormat(d.funds,1)}}</b></td><td><b>{{layui.utils.numFormat(d.bnss,1)}}</b></td><td><b>{{layui.utils.numFormat(d.yk1s,1)}}</b></td></tr></tfoot></table>'
          )
          .render(t, function (t) {
            layui.$('#tpList', e).html(t)
          }),
          layui.$('a[name=lttDate]', e).click(function (e) {
            ;(layui.stope(e), e.preventDefault())
            var a = this
            layui.use('dayStatement', function (e) {
              e.render({
                'paramMap.dayDate': a.getAttribute('data-lttDate'),
                'paramMap.userId': t.upId
              })
            })
          }))
      })
    }
    t('weekStatement', {
      render: function (t) {
        var a = layui.main.container.content
        if (
          (a.html(
            '<div class="panel panel-success"><div class="panel-heading"><div class="panel-title clearfix"><div class="pull-left font-wght">周报表&nbsp;&nbsp;|</div><span class="pull-left font-wght"><a  id="weekA" href="">&nbsp;&nbsp;上&nbsp;周</a> &nbsp;&nbsp;|&nbsp;&nbsp;</span><span class="pull-left font-wght"><a  id="weekA" href="">&nbsp;&nbsp;本&nbsp;周</a> &nbsp;&nbsp;|&nbsp;&nbsp;</span><span class="pull-left font-wght"><a  id="weekA" href="">&nbsp;&nbsp;上半月</a> &nbsp;&nbsp;|&nbsp;&nbsp;</span><span class="pull-left font-wght"><a  id="weekA" href="">&nbsp;&nbsp;本半月</a> &nbsp;&nbsp;|&nbsp;&nbsp;</span><div class="layui-inline"><ul class="ul-list"><li class="ul-list-item"><div class="layui-inline" style="margin-top: -5px; width: 100px;"><div class="layui-input-inline"><input type="text" class="layui-input" id="startDate" readonly="" placeholder="yyyy-MM-dd"></div></div></li><li class="ul-list-item text-white">~</li><li class="ul-list-item"><div class="layui-inline" style="margin-top: -5px; width: 100px;"><div class="layui-input-inline"><input type="text" class="layui-input" id="endDate" readonly="" placeholder="yyyy-MM-dd"></div></div></li></ul></div>&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="searchBtn" class="layui-btn layui-btn-warm layui-btn-small">查 询</button></div></div><div id="tpList" class="panel-body pd0"></div></div>'
          ),
          !t)
        ) {
          t = {}
          var n = new Date(),
            i = n.getFullYear() + '-' + layui.utils.padding0(n.getMonth() + 1, 2) + '-',
            l = new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate()
          ;(n.getDate() >= 16
            ? ((t['paramMap.startDate'] = i + '16'),
              (t['paramMap.endDate'] = i + l),
              layui.$('[id=weekA]:eq(3)', a).addClass('text-blue'),
              layui
                .$('[id=weekA]:eq(3)', a)
                .data('first-day', i + '16')
                .data('last-day', i + l),
              layui
                .$('[id=weekA]:eq(2)', a)
                .data('first-day', i + '01')
                .data('last-day', i + '15'))
            : ((t['paramMap.startDate'] = i + '01'),
              (t['paramMap.endDate'] = i + '15'),
              layui.$('[id=weekA]:eq(3)', a).addClass('text-blue'),
              layui
                .$('[id=weekA]:eq(3)', a)
                .data('first-day', i + '01')
                .data('last-day', i + '15'),
              (i = n.getFullYear() + '-' + layui.utils.padding0(n.getMonth(), 2) + '-'),
              0 == n.getMonth() && (i = n.getFullYear() - 1 + '-12-'),
              (l = new Date(n.getFullYear(), n.getMonth(), 0).getDate()),
              layui
                .$('[id=weekA]:eq(2)', a)
                .data('first-day', i + '16')
                .data('last-day', i + l)),
            layui.$('#startDate', a).val(t['paramMap.startDate']),
            layui.$('#endDate', a).val(t['paramMap.endDate']),
            layui.laydate.render({
              elem: '#startDate',
              min: '2017-10-01',
              max: 0,
              btns: ['now', 'confirm'],
              ready: function (t) {
                layui.utils.isPc() || layui.$('div[id^=layui-laydate]').css('left', layui.$('#startDate').offset().left)
              }
            }),
            layui.laydate.render({
              elem: '#endDate',
              min: '2017-10-01',
              max: 0,
              btns: ['now', 'confirm'],
              ready: function (t) {
                layui.utils.isPc() || layui.$('div[id^=layui-laydate]').css('left', layui.$('#endDate').offset().left)
              }
            }),
            layui.$('button[id=searchBtn]').click(function (a) {
              ;(layui.stope(a), a.preventDefault(), layui.$('a[id=moonA]').removeClass('text-blue'), (t['paramMap.startDate'] = layui.$('#startDate').val()), (t['paramMap.endDate'] = layui.$('#endDate').val()), e(t))
            }),
            layui.$('a[id=weekA]').click(function (a) {
              ;(layui.stope(a), a.preventDefault(), layui.main.remove_laydate())
              var n = layui.$(this)
              ;(layui.$('a[id=weekA]').removeClass('text-blue'), n.addClass('text-blue'), (t['paramMap.startDate'] = n.data('first-day')), (t['paramMap.endDate'] = n.data('last-day')), layui.$('#startDate').val(t['paramMap.startDate']), layui.$('#endDate').val(t['paramMap.endDate']), e(t))
            }))
        }
        ;(layui.$('[id=weekA]:eq(0)', a).data('first-day', dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD')).data('last-day', dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')),
          layui.$('[id=weekA]:eq(1)', a).data('first-day', dayjs().startOf('week').format('YYYY-MM-DD')).data('last-day', dayjs().format('YYYY-MM-DD')),
          e(t))
      }
    })
  }),
  layui.define(function (t) {
    var e,
      a = layui.$,
      n = layui.laytpl,
      i = (layui.form, ['f4', 'f5', 'f7']),
      l = {
        notice: a('#notice'),
        mainMenu: a('#mainMenu'),
        childMenu: a('#childMenu'),
        content: a('#content'),
        countDown: a('#countDown'),
        webTitle: a('#web_title'),
        ptiem: a('#ptiem'),
        pnum: a('#pnum'),
        ac: a('#ac'),
        ac2: a('#ac2'),
        curr: a('#curr'),
        surp: a('#surp'),
        huse: a('#huse'),
        lttnum: a('span[id=lttnum]'),
        status: 'open',
        importTxt: !1,
        timeImprot: 20,
        sAudio: function () {
          var t = document.createElement('audio')
          return ((t.src = 'assets/sound/success.wav'), t)
        },
        fAudio: function () {
          var t = document.createElement('audio')
          return ((t.src = 'assets/sound/sound.wav'), t)
        }
      }
    function r() {
      var t = this,
        e = 108e5,
        a = layui.request_last_time
      ;((t.isOpen = !1),
        (t.curr_index = 1),
        (t.init = function () {
          try {
            t.timer = setInterval(function () {
              a != layui.request_last_time && ((a = layui.request_last_time), (t.curr_index = 1))
              var n = new Date().getTime() - layui.request_last_time
              e > n && (n >= 3e4 * t.curr_index || !t.isOpen) ? ((t.curr_index = (parseInt(n / 3e4) || t.curr_index) + 1), o()) : 12601e3 < n && o()
            }, 1e4)
          } catch (t) {}
        }))
    }
    function o() {
      layui.utils.post(
        'member/index/init',
        void 0,
        function (t) {
          ;(t.data && t.data.remainingLimit && l.curr.text(t.data.remainingLimit),
            l.notice.html(p(t.data.lampContent)),
            layui.$('#text').html(p(t.data.ejectContent)),
            setTimeout(function () {
              layui.$('#posiTips').fadeOut(3e3)
            }, 5e3))
          var e = l.lttnum[0].innerText,
            n = t.data.settingStage,
            i = n.stageNo,
            r = n.remainingTime
          ;('' == e && (e = i),
            n
              ? (l.lttnum.text(i),
                null != layui.quickType && localStorage.removeItem(1 * i - 1),
                layui.use('util', function () {
                  ;(l.timer && clearTimeout(l.timer),
                    n.remainingTime > 0
                      ? ((layui.differenceTime = r),
                        layui.util.countdown(r, function (n, r, o) {
                          l.timer = o
                          var p = 60 * n[0] * 24 + 60 * n[1] + n[2]
                          if (n[0] + n[1] + n[2] + n[3] != 0) {
                            p < t.importTxt && (l.importTxt = !0)
                            var d = n[2] + '分' + n[3] + '秒'
                            ;(l.countDown.text('距停盘：' + d),
                              (l.status = 'open'),
                              layui.awaken_timer.isOpen || ((e = i), u(), a('#idxBy').html(''), a('#lotCount').html(0), a('#lotMoney').html(0), a('#currlotCount').html(0), a('#currlotMoney').html(0), l.ptiem.html(''), l.pnum.html(''), l.pnum.attr('data-printed', 0)),
                              (layui.awaken_timer.isOpen = !0))
                          } else s()
                        }))
                      : s())
                }))
              : s())
        },
        void 0,
        void 0,
        void 0,
        !1
      )
    }
    function s() {
      ;(clearTimeout(l.timer), (layui.awaken_timer.isOpen = !1), (l.status = 'closed'), l.countDown.text('已停盘'), u())
    }
    function u() {
      if (l.childMenu.find('.active').length > 0) {
        var t = l.childMenu.find('.active').attr('data-modula')
        ;('liangmian' != t && 'fantan' != t && 'lotTwo' != t && 'quickSelectForHn5' != t && 'quickType' != t && 'lotOne' != t && 'txtImport' != t && 'quickTranslate' != t) || l.childMenu.find('.active').click()
      }
      h()
    }
    function p(t) {
      var e = document.createElement('div')
      e.innerHTML = t
      var a = e.innerText || e.textContent
      return ((e = null), a)
    }
    function d() {
      layui.utils.post('member/index/userInfo', null, function (t) {
        ;(l.ac.text(t.data.userName), l.ac2.text(t.data.userName), l.curr.text(t.data.ml.remainingLimit), l.webTitle.text(t.data.title || '加拿大28'), (document.title = t.data.title || '加拿大28'))
      })
    }
    function c(t) {
      ;(l.content.empty(),
        layui.use(t, function (t) {
          ;(l.content.unbind(), t.render())
        }))
    }
    function f() {
      layui.utils.post('member/index/notPrintNoList', void 0, function (t) {
        if (200 === t.code) {
          var e = {}
          ;((e.list = t.data.slice(0, 500)), (e.loMy = 0))
          for (var i = 0; i < t.data.length; i++) e.loMy += t.data[i][3]
          if (0 === e.list.length) return
          setTimeout(function () {
            n('{{# layui.each(d.list,function(index,item){ }}<tr data="{{item[1]}}"><td>{{item[1]}}</td><td>1:{{item[4]}}</td><td>{{item[3]}}</td></tr>{{# }); }}').render(e, function (n) {
              var i = t.data[0][0],
                r = t.data[0][2]
              ;(a('#idxBy').html(n),
                a('#lotCount').html(t.data.length),
                a('#lotMoney').html(layui.utils.numFormat(1e4 * e.loMy, 2)),
                a('#currlotCount').html(t.data.length),
                a('#currlotMoney').html(layui.utils.numFormat(1e4 * e.loMy, 2)),
                l.ptiem.html(r || ''),
                l.pnum.html(i || ''),
                l.pnum.attr('data-printed', i || 0),
                setTimeout(function () {
                  a('#side-left').scrollTop(a('#side-left')[0].scrollHeight)
                }, 10))
            })
          }, 100)
        }
      })
    }
    function h() {
      layui.utils.post('member/index/new/open', '', function (t) {
        if (t.data) {
          layui.$('#prelttnum').text(t.data.stageNo)
          var e = t.data.openNumber.split(''),
            a = (e[1] + '' + e[2]) % 4 || 4
          layui.$('#period').text((t.data && t.data.openNumber.split('').join(',') + ' | ' + a) || void 0)
        }
      })
    }
    ;((e = new (function () {
      ;((this.pages = []),
        (this.addPage = function (t, e) {
          ;(this.pages.push({
            mainMenuIndex: t,
            childMenuIndex: e
          }),
            sessionStorage &&
              sessionStorage.setItem(
                'lastPage',
                JSON.stringify({
                  mainMenuIndex: t,
                  childMenuIndex: e
                })
              ))
        }),
        (this.loadPage = function (t) {
          0 ===
          (t = t || {
            mainMenuIndex: 0,
            childMenuIndex: 3
          }).mainMenuIndex
            ? l.childMenu.find('li:eq(' + t.childMenuIndex + ')').click()
            : l.mainMenu.find('li:eq(' + t.mainMenuIndex + ')').click()
        }))
      var t = this
      ;(history.pushState && history.pushState(null, null, document.URL),
        history.pushState &&
          window.addEventListener('popstate', function () {
            if ((history.pushState(null, null, document.URL), t.pages.length > 1)) {
              t.pages.pop()
              var a = t.pages.pop()
              e.loadPage(a)
            }
          }))
    })()),
      l.mainMenu.on('click', 'li', function (t) {
        ;(layui.stope(t), t.preventDefault())
        var n = a(this)
        'main' === n.data('modula') ? l.childMenu.find('li:eq(3)').click() : 'layout' === n.data('modula') ? layui.main.doLayout() : (n.siblings('.active').removeClass('active'), n.addClass('active'), l.childMenu.find('li.active').removeClass('active'), c(n.data('modula')), e.addPage(n.index(), 0))
      }),
      l.childMenu.on('click', 'li', function (t) {
        ;(layui.stope(t), t.preventDefault())
        var n = a(this)
        ;(n.siblings('.active').removeClass('active'), n.addClass('active'), l.mainMenu.find('li.active').removeClass('active'), l.mainMenu.find('li:eq(0)').addClass('active'), c(n.data('modula')), e.addPage(0, n.index()))
      }),
      e.loadPage(sessionStorage && JSON.parse(sessionStorage.getItem('lastPage'))),
      o(),
      d(),
      f(),
      h(),
      layui.form.on('submit(clear)', function () {
        return (
          a('#idxBy').find('tr').length < 1 ||
            layui.utils.confirm(
              '确认清空号码',
              function () {
                layui.utils.post(
                  'member/index/clearPrintOrders',
                  {
                    t: Date.now()
                  },
                  function (t) {
                    ;(layui.utils.success('清除号码成功！'), a('#idxBy').html(''), a('#lotCount').html(0), a('#lotMoney').html(0), l.ptiem.html(''), l.pnum.html(''))
                  }
                )
              },
              '确认'
            ),
          !1
        )
      }),
      layui.form.on('submit(print)', function () {
        var t = a('#idxBy').find('tr'),
          e = []
        return (
          a.each(t, function (t, n) {
            var i = {}
            ;((i.betId = a(n).attr('data')), e.push(i))
          }),
          layui.utils.msg('已暂停打印功能'),
          l.pnum.attr('data-printed', 1),
          localStorage.setItem('not_print', !0),
          !1
        )
      }),
      (layui.awaken_timer = new r()),
      layui.awaken_timer.init(),
      layui.$('#refMoney').on('click', function (t) {
        d()
      }),
      (layui.util.countdown = function (t, e) {
        var a = 'function' == typeof serverTime,
          n = [Math.floor(t / 864e5), Math.floor(t / 36e5) % 24, Math.floor(t / 6e4) % 60, Math.floor(t / 1e3) % 60]
        a && (e = serverTime)
        var i = setTimeout(function () {
          layui.util.countdown(t - 1e3, e)
        }, 1e3)
        return (e && e(t > 0 ? n : [0, 0, 0, 0], t, i), t <= 0 && clearTimeout(i), i)
      }),
      setTimeout(function () {
        layer.tips('网速太慢 ?<br>点我切换属于您的优质线路', layui.$('.choose-line'), {
          tips: 3,
          time: 3e3
        })
      }, 3e3),
      layui.$('.choose-line').click(function () {
        var t = new Date().getTime(),
          e = window.document.location.protocol,
          a = window.location.hostname,
          n = a.substring(a.indexOf('.') + 1, a.length),
          l = [],
          r = i.map(function (t, a) {
            return {
              host: e + '//' + t + '.' + n,
              des: '线路' + (+a + 2)
            }
          }),
          o = 1,
          s = 0,
          u = !1
        function p() {
          l = []
          layui.utils.post(
            'member/login/getToken',
            void 0,
            function (rs) {
              var token = encodeURIComponent(rs.data.token)
              for (var e = 0; e < r.length; e++) {
                var n = r[e].host
                if ('127.0.0.1' == a || 'localhost' == a || a.indexOf('192.168') > -1) {
                  var i = window.document.location.pathname.substring(0, window.document.location.pathname.substr(1).indexOf('/') + 1)
                  n = window.document.location.protocol + '//' + a + ('' == location.port ? '' : ':' + location.port) + i
                }
                ;(l.push('<div class="line layui-clear">'),
                  l.push('\t<a class="line-name" href="' + n + '/member/login/FastLogin?t=' + t + '&tk=' + token + '">' + r[e].des + '（点我切换）</a>'),
                  l.push('\t<span class="line-time" name="' + n + '">-</span>'),
                  l.push('\t<img style="display: none;" src="' + n + '/member/switchLine/speed?_=' + t + '" onload="window._load(this, ' + o + ')" onerror="window._error(this)" />'),
                  l.push('</div>'))
              }
              ;(l.push('<button disabled="disabled" class="layui-btn layui-btn-normal layui-btn-small retest-btn layui-btn-disabled">重新测速</button>'),
                1 == o || (layui.$('.choose-line-modal').html(''), (t = new Date().getTime())),
                layui.$('.choose-line-modal').html(l.join('')),
                2 == o &&
                  setTimeout(function () {
                    layui.$('.choose-line-modal .retest-btn').removeClass('layui-btn-disabled').prop('disabled', !1)
                  }, 1e3))
            },
            void 0,
            void 0,
            void 0,
            !1
          )
        }
        function d(t) {
          return t < 800 ? 'text-green' : 'text-red'
        }
        ;((window._load = function (e, a) {
          if (!(o > a)) {
            if (++s === r.length && 1 == o) return ((u = !1), (o = 2), (t = new Date().getTime()), void p())
            var n = new Date().getTime()
            if (0 == u) {
              ;((u = !0), (l = document.createElement('span')).setAttribute('class', d(n - t)), (l.innerHTML = '&nbsp;&nbsp;' + (n - t) + 'ms'))
              var i = document.createElement('em')
              ;((i.innerHTML = '&nbsp;最快'), i.setAttribute('class', 'text-red'), (e.previousElementSibling.innerHTML = ''), e.previousElementSibling.appendChild(i), e.previousElementSibling.appendChild(l))
            } else {
              var l
              ;((l = document.createElement('span')).setAttribute('class', d(n - t)), (l.innerHTML = '&nbsp;&nbsp;' + (n - t) + 'ms'), (e.previousElementSibling.innerHTML = ''), e.previousElementSibling.appendChild(l))
            }
          }
        }),
          (window._error = function (t) {
            var e = document.createElement('em')
            ;((e.innerHTML = '&nbsp;error'), t.parentNode.appendChild(e))
          }),
          layer.open({
            type: 1,
            title: '选择线路',
            area: ['400px', '320px'],
            content: '<div class="choose-line-modal"></div>',
            success: function (e) {
              ;(p(),
                setTimeout(function () {
                  1 == o && ((u = !1), (o = 2), (t = new Date().getTime()), p())
                }, 2e3),
                layui.$(e).on('click', 'button', function () {
                  ;((u = !1), p())
                }))
            }
          }))
      }),
      t('main', {
        doLayout: function () {
          ;(sessionStorage && sessionStorage.clear(), (window.location.href = 'member/logout'))
        },
        getUserTypeDescribe: function (t) {
          var e = ['', '公司', '总监', '大股东', '股东', '总代', '代理', '会员']
          return t ? e[t] : e
        },
        container: l,
        initUserInfo: d,
        showUnprint: f,
        palyAudio: function (t) {
          if ('success' == t)
            try {
              l.sAudio().play()
            } catch (t) {}
          else
            try {
              l.fAudio().play()
            } catch (t) {}
        },
        closeDiv: function () {
          layui.$('#posiTips').hide()
        },
        refresh: h,
        remove_laydate: function () {
          layui.$('div[id^=layui-laydate]').remove()
        }
      }))
  }))
