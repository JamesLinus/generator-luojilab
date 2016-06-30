<style src="../../../sass/base/base.scss"></style>
<style lang="sass">
.dash-container {
    display: flex;
    width: 100%;
    padding: 5rem 0 0 5rem;
    background: #f3f3f3;
}
.dash-content {
    width: 100%;
}
.dash-header {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: rgb(45,44,50);
    width: 12rem;
    flex-shrink: 0;
    z-index: 1001;
}
.dash-header-logo {
    height: 4rem;
    background: #2db7f5;
    line-height: 4rem;
    font-size: 1.5rem;
    padding: 0 1rem;
    color: #fff;
}
.dash-nav-item {
    height: 3rem;
    line-height: 3rem;
    color: #fff;
    padding: 0 .5rem;
    font-size: .8rem;
    border-right: .2rem solid rgba(0,0,0,0);
    border-left: .2rem solid rgba(0,0,0,0);
    box-sizing: border-box;
    cursor: pointer;
}
.dash-nav-item:hover,
.dash-nav-item.active {
    border-left: .2rem solid #2db7f5 ;
    background-color: rgba(0,0,0,0.8);
}
.dash-nav-icon {
    font-size: 1rem;
    margin: 0 1rem 0 1rem;
}
.dash-header.small {
    height: 100%;
    background: rgb(45,44,50);
    width: 4rem;
    .dash-header-logo {
        text-align: center;
    }
    .dash-nav-item {
        text-align: center;
    }
    .dash-nav-icon {
        display: none;
    }
    .dash-header-logo-text {
        display: none;
    }
}

.dash-content-header {
    position: fixed;
    height: 4rem;
    background: #fff;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 1rem;
    display: flex;
    box-sizing: border-box;
    line-height: 4rem;
    justify-content: flex-end;
    z-index: 1000;
}

.dash-row {
    background-color: #fff;
    margin: .5rem;
    padding: .5rem 1rem;
}
.dash-row-header {
    height: 1.6rem;
    font-size: .9rem;
    line-height: 1.6rem;
    border-bottom: 1px solid #f3f3f3;
    margin-bottom: 1rem;
}
.dash-content-header-nav-item {
    padding: 0 1rem;
    position: relative;
}
.dash-item-menu {
    display: none;
    position: absolute;
    background: #fff;
    top: 100%;
    right: 0;
    border: 1px solid #fbfbfb;
}
.dash-item-menu-item {
    color: #666;
    line-height: 2rem;
    padding: .5rem 1rem;
    min-width: 6rem;
    text-align: center;
    border-bottom: 1px solid #fbfbfb;
}
.dash-content-header-nav-item:hover {
    background: #2db7f5;
    color: #fff;
}
.dash-content-header-nav-item:hover .dash-item-menu{
    display: block;
}
.dash-item-menu-item:hover {
    background: #fbfbfb;
}
.dash-row-body {
    display: flex;
    justify-content: center;
}
.dash-card {
    border: 1px solid #f3f3f3;
    margin: .5rem;
    padding: .5rem 1rem;
}
.dash-card-title {
    font-size: .8rem;
    text-align: center;
}
.dash-info-row2 {
    display: flex;
    width: 100%;
}
.dash-info-row2-item {
    margin: 0 1rem;
}
.dash-status-row {
    display: flex;
    width: 100%;
}
.dash-status-card {
    width: 12rem;
    background: #ccc;
    text-align: center;
    font-size: .8rem;
    min-height: 6rem;
    margin: 0 1rem;
}
.dash-status-card-title {
    font-size: 1rem;
    height: 2rem;
    line-height: 2rem;
}
.dash-status-card-time {
    line-height: 2rem;
}
</style>
<template>
    <div class="dash-container">
        <header class="dash-header small">
            <div class="dash-header-logo">
                <i class="dash-header-logo-icon ion-ios-infinite"></i>
                <span class="dash-header-logo-text">iBoss</span>
            </div>
            <nav class="dash-nav">
                <div class="dash-nav-item">
                    <i class="dash-nav-icon ion-home"></i>
                    <span>首页</span>
                </div>
                <div class="dash-nav-item active">
                    <i class="dash-nav-icon ion-person"></i>
                    <span>商家</span>
                </div>
                <div class="dash-nav-item">
                    <i class="dash-nav-icon ion-home"></i>
                    <span>仓库</span>
                </div>
                <div class="dash-nav-item">
                    <i class="dash-nav-icon ion-home"></i>
                    <span>合同</span>
                </div>
                <div class="dash-nav-item">
                    <i class="dash-nav-icon ion-home"></i>
                    <span>产品</span>
                </div>
                <div class="dash-nav-item">
                    <i class="dash-nav-icon ion-home"></i>
                    <span>发票</span>
                </div>
                <div class="dash-nav-item">
                    <i class="dash-nav-icon ion-home"></i>
                    <span>设置</span>
                </div>
            </nav>
        </header>
        <div class="dash-content-header">
            <div class="dash-content-header-nav-item">
                <span>商户</span>
            </div>
            <div class="dash-content-header-nav-item">
                <span>管理员</span>
                <i class="ion-chevron-down"></i>
                <div class="dash-item-menu">
                    <div class="dash-item-menu-item">设置</div>
                    <div class="dash-item-menu-item">退出</div>
                </div>
            </div>
        </div>
        <div class="dash-content">
            <div class="dash-row">
                <div class="dash-row-header">
                    <span class="dash-row-title">运营常用快捷操作</span>
                </div>
                <div class="dash-row-body">
                    <div class="dash-card">
                        <div class="dash-card-title">查看订单状态</div>
                        <div class="dash-card-body">
                            <p>sdasda sasdasdasdasd</p>
                        </div>
                    </div>
                    <div class="dash-card">
                        <div class="dash-card-title">查看订单状态</div>
                        <div class="dash-card-body">
                            <p>sdasda sasdasdasdasd</p>
                        </div>
                    </div>
                    <div class="dash-card">
                        <div class="dash-card-title">查看订单状态</div>
                        <div class="dash-card-body">
                            <p>sdasda sasdasdasdasd</p>
                        </div>
                    </div>
                    <div class="dash-card">
                        <div class="dash-card-title">查看订单状态</div>
                        <div class="dash-card-body">
                            <p>sdasda sasdasdasdasd</p>
                        </div>
                    </div>
                    <div class="dash-card">
                        <div class="dash-card-title">查看订单状态</div>
                        <div class="dash-card-body">
                            <p>sdasda sasdasdasdasd</p>
                        </div>
                    </div>
                    <div class="dash-card">
                        <div class="dash-card-title">查看订单状态</div>
                        <div class="dash-card-body">
                            <p>sdasda sasdasdasdasd</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dash-row">
                <div class="dash-row-header">
                    <span class="dash-row-title">批量操作结果</span>
                </div>
                <div class="dash-row-body">
                    <div class="dash-info-row2">
                        <div class="rd-col-6 dash-info-row2-item ">
                            <rd-table :table="row2.orderInsert"></rd-table>
                        </div>
                        <div class="rd-col-18 dash-info-row2-item ">
                            <rd-table :table="row2.orderInfo"></rd-table>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="dash-row">
                <div class="dash-row-header">
                    <span class="dash-row-title">系统及接口状态(前一触发节点数据)</span>
                </div>
                <div class="dash-row-body">
                    <div class="dash-status-row">
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dash-row">
                <div class="dash-row-header">
                    <span class="dash-row-title">系统及接口状态(前一触发节点数据)</span>
                </div>
                <div class="dash-row-body">
                    <div class="dash-status-row">
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dash-row">
                <div class="dash-row-header">
                    <span class="dash-row-title">系统及接口状态(前一触发节点数据)</span>
                </div>
                <div class="dash-row-body">
                    <div class="dash-status-row">
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dash-row">
                <div class="dash-row-header">
                    <span class="dash-row-title">系统及接口状态(前一触发节点数据)</span>
                </div>
                <div class="dash-row-body">
                    <div class="dash-status-row">
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                        <div class="dash-status-card">
                            <div class="dash-status-card-title">
                                抓取天猫订单
                            </div>
                            <div class="dash-status-card-time">
                                2016-06-08 10:30:00
                            </div>
                            <div class="dash-status-card-info">
                                3280成功 | 0失败
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../../../../radon-ui/dist/static/css/dist.css'
import {
    rdTable
} from '../../../../radon-ui/dist/components/index'

export default {
    data () {
        return {
            row2: {
                orderInsert: {
                        options: {
                            select: false
                        },
                        columns: [],
                        tableData: [{
                            value: [
                                'hunk',
                                '06-23 17:41',
                                '700',
                                '处理中'
                            ]
                        }, {
                            value: [
                                'hunk',
                                '06-23 17:41',
                                '700',
                                '处理中'
                            ]
                        }, {
                            value: [
                                'hunk',
                                '06-23 17:41',
                                '700',
                                '处理中'
                            ]
                        }, {
                            value: [
                                'hunk',
                                '06-23 17:41',
                                '700',
                                '处理中'
                            ]
                        }, {
                            value: [
                                'hunk',
                                '06-23 17:41',
                                '700',
                                '处理中'
                            ]
                        }]
                },
                orderInfo: {
                        options: {
                            select: false
                        },
                        columns: [],
                        tableData: [{
                            value: [
                                'hunk',
                                '06-23 17:41',
                                'LJBSP1606045PJ005 等',
                                '3268个订单',
                                '处理中'
                            ]
                        }, {
                            value: [
                                'hunk',
                                '06-23 17:41',
                                'LJBSP1606045PJ005 等',
                                '3268个订单',
                                '处理中'
                            ]
                        }, {
                            value: [
                                'hunk',
                                '06-23 17:41',
                                'LJBSP1606045PJ005 等',
                                '3268个订单',
                                '处理中'
                            ]
                        }, {
                            value: [
                                'hunk',
                                '06-23 17:41',
                                'LJBSP1606045PJ005 等',
                                '3268个订单',
                                '处理中'
                            ]
                        }, {
                            value: [
                                'hunk',
                                '06-23 17:41',
                                'LJBSP1606045PJ005 等',
                                '3268个订单',
                                '处理中'
                            ]
                        }]
                }
            }
        }
    },
    components: {
        rdTable
    },
    methods: {
    }
}
</script>