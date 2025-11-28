import { Language } from './types';

export const TRANSLATIONS = {
  en: {
    nav: {
      home: 'CodeNexus',
      searchPlaceholder: 'Search scripts, themes, plugins...',
      sell: 'Sell Code',
      marketplace: 'Marketplace',
      dashboard: 'Seller Hub',
      admin: 'Admin',
      theme: 'Theme',
      login: 'Login',
      logout: 'Logout',
      products: 'Products',
      allProducts: 'All Products'
    },
    auth: {
      loginTitle: 'Access Terminal',
      registerTitle: 'New Operative',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submitLogin: 'Authenticate',
      submitRegister: 'Initialize Account',
      switchLogin: 'Already have an ID? Login',
      switchRegister: 'Need access? Register',
      success: 'Access Granted'
    },
    hero: {
      tag: '🚀 The Future of Code Trading',
      titlePrefix: 'Build Faster with',
      titleSuffix: 'Premium Source Code',
      subtitle: 'Discover audited, high-performance codebases. 3D-visualized marketplace for the next generation of developers.',
      explore: 'Explore Market',
      startSelling: 'Start Selling',
      casinoTitle: 'HIT THE JACKPOT',
      casinoSubtitle: 'Premium Assets. High Returns. No Gamble.',
      stockTitle: 'MARKET MOVERS',
      stockSubtitle: 'Invest in high-growth codebases. Track real-time asset performance.'
    },
    stats: {
      instant: 'Instant Delivery',
      instantDesc: 'Automated git access',
      verified: 'Verified Code',
      verifiedDesc: 'Audited by experts',
      seo: 'SEO Optimized',
      seoDesc: 'Rank higher instantly'
    },
    products: {
      featured: 'Featured Products',
      filters: ['All', 'SaaS', 'Mobile', 'Crypto', 'AI'],
      currency: '$',
      loadMore: 'Load More Products',
      showing: 'Showing'
    },
    detail: {
      back: 'Back to Marketplace',
      sales: 'sales',
      createdBy: 'Created by',
      license: 'Regular License',
      buy: 'Purchase & Download',
      secure: 'Secure payment processed by Stripe. 100% Money Back Guarantee.',
      techStack: 'Tech Stack',
      verified: 'Code quality verified by CodeNexus Audit Team'
    },
    seo: {
      title: 'AI SEO Optimizer',
      subtitle: 'Boost your source code visibility with Gemini-powered metadata generation.',
      sourceDetails: 'Source Details',
      projectName: 'Project Name',
      projectPlaceholder: 'e.g. Ultimate E-commerce React Template',
      rawDesc: 'Raw Description',
      descPlaceholder: 'Paste your rough project features, tech stack, and benefits here...',
      generate: 'Generate SEO Magic',
      generating: 'Optimizing...',
      results: 'Results will appear here',
      analyzing: 'Analyzing tech stack...',
      keywords: 'Keywords',
      shareSnippet: 'Social Share Snippet',
      apply: 'Apply Metadata'
    },
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty',
      startShopping: 'Start Shopping',
      total: 'Total',
      checkout: 'Checkout Securely',
      remove: 'Remove'
    },
    profile: {
      title: 'User Profile',
      memberSince: 'Member since',
      purchases: 'My Purchases',
      settings: 'Settings',
      logout: 'Logout',
      editProfile: 'Edit Profile',
      download: 'Download'
    },
    admin: {
      title: 'NEXUS OS',
      subtitle: 'Admin Console',
      exit: 'Exit Console',
      connected: 'Connected',
      latency: 'Latency',
      collapse: 'Collapse Menu',
      expand: 'Expand Menu',
      menu: {
        overview: 'Overview',
        monitoring: 'Global Monitor',
        products: 'Product Mgmt',
        publish: 'Publish New',
        orders: 'Order Analysis',
        users: 'User Data',
        system: 'System Health',
        settings: 'System Config'
      },
      widgets: {
        revenue: 'Total Revenue',
        activeSessions: 'Active Sessions',
        serverLoad: 'Server Load',
        threats: 'Threats Blocked',
        mapTitle: 'Global Traffic Map',
        liveLogs: 'System Logs',
        topProducts: 'Top Products',
        requestRate: 'Request Rate',
        throughput: 'Throughput',
        nodes: 'Active Nodes'
      },
      table: {
        product: 'Product Name',
        sales: 'Sales',
        price: 'Price',
        status: 'Status',
        user: 'User',
        orderId: 'Order ID',
        amount: 'Amount',
        time: 'Time',
        action: 'Action'
      },
      publish: {
        title: 'Publish New Product',
        basicInfo: 'Basic Information',
        productName: 'Product Name',
        category: 'Category',
        price: 'Price',
        description: 'Description',
        upload: 'Upload Assets',
        dragDrop: 'Drag and drop your zip file here',
        submit: 'Publish Product'
      },
      settings: {
        title: 'System Configuration',
        smtpSection: 'SMTP Email Configuration',
        host: 'SMTP Host',
        port: 'SMTP Port',
        user: 'Username',
        pass: 'Password',
        chatSection: 'Support Widget Settings',
        welcomeMsg: 'Welcome Message',
        save: 'Save Configuration',
        paymentSection: 'Payment Gateway',
        enablePayment: 'Enable Crypto Payment System',
        menuSection: 'Frontend Menu Management',
        addMenuItem: 'Add Menu Item',
        menuLabel: 'Label',
        menuLink: 'Target (View/URL)'
      }
    },
    chat: {
      title: 'Support',
      subtitle: 'Online',
      placeholder: 'Type a message...',
      send: 'Send',
      welcome: 'Hello! How can we help you build your next project today?'
    },
    payment: {
      title: 'Crypto Payment',
      scan: 'Scan QR Code',
      amount: 'Total Amount',
      address: 'Wallet Address',
      network: 'Network',
      warning: 'Please send only USDT (ERC20/TRC20). Sending other assets may result in permanent loss.',
      timeRemaining: 'Time Remaining',
      confirm: 'I Have Paid',
      copy: 'Copy',
      copied: 'Copied!',
      expired: 'Payment session expired. Please refresh.',
      maintenance: 'Payment system is currently under maintenance. Please try again later.'
    },
    footer: {
      copyright: '© 2024 CodeNexus Inc. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      themes: {
        default: {
          desc: 'The premium marketplace for high-quality source code, scripts, and plugins. Powered by AI.',
          col1: 'Marketplace',
          col1Items: ['Popular Scripts', 'New Arrivals', 'SaaS Kits', 'Mobile Apps'],
          col2: 'Sellers',
          col2Items: ['Start Selling', 'Seller Dashboard', 'AI SEO Tools', 'API Integration'],
          col3: 'Connect'
        },
        blockchain: {
          desc: 'Decentralized marketplace logic. Smart contract verified. Immutable audit logs.',
          col1: 'DeFi Assets',
          col1Items: ['Yield Farming', 'DEX Aggregators', 'Flash Loan Bots'],
          col2: 'NFT Templates',
          col2Items: ['Generative Art', 'Marketplace UI', 'Minting Dapps'],
          col3: 'DAO Tools'
        },
        cybersec: {
          desc: 'Engineered for performance and security. The definitive platform for enterprise-grade source code distribution.',
          col1: 'Products',
          col1Items: ['Penetration Tools', 'Firewall Scripts', 'Encryption Libs'],
          col2: 'Resources',
          col2Items: ['Security Audit', 'Zero Day Reports', 'CVE Database'],
          col3: 'Legal'
        },
        aurora: {
          desc: 'Join the world\'s fastest growing source code marketplace. Beautifully designed, expertly audited.',
          col1: 'Platform',
          col1Items: ['Marketplace', 'Sellers', 'Pricing', 'Legal'],
          col2: 'Resources',
          col2Items: ['Documentation', 'Blog', 'Community', 'Help Center'],
          col3: 'Company'
        },
        crimson: {
          desc: 'AUTHORIZED PERSONNEL ONLY. SECURE ASSET TRADING PLATFORM. LEVEL 5 CLEARANCE REQUIRED.',
          col1: 'SECTOR A: Market',
          col1Items: ['Weapons Control', 'Defense Grid', 'Tactical Ops'],
          col2: 'SECTOR B: Agents',
          col2Items: ['Recruitment', 'Black Ops', 'Field Manuals'],
          col3: 'SECTOR C: Comms'
        },
        matrix: {
          desc: '> CONNECTING DEVELOPERS... > AUDITING SOURCE CODE... > DEPLOYING ASSETS... // STATUS: ONLINE',
          col1: '[DIR] Marketplace',
          col1Items: ['Popular_Scripts.sh', 'New_Arrivals.exe', 'SaaS_Kits.zip', 'Mobile_Apps.apk'],
          col2: '[DIR] User_Root',
          col2Items: ['Login_Shell', 'Dashboard_Init', 'SEO_Tools_v2', 'API_Gateway'],
          col3: '[NET] Protocols'
        },
        casino: {
          desc: 'The house always wins, but so do you. Premium assets for high-rollers.',
          col1: 'Table Games',
          col1Items: ['Poker Scripts', 'Roulette Logic', 'Blackjack UI'],
          col2: 'Slots',
          col2Items: ['RNG Engines', 'Animation Packs', 'Sound FX'],
          col3: 'VIP Club'
        },
        stock: {
          desc: 'Real-time asset trading for the modern developer. Invest in code that yields returns.',
          col1: 'Markets',
          col1Items: ['Indices', 'Forex Bots', 'Crypto Algos'],
          col2: 'Analytics',
          col2Items: ['Technical Indicators', 'Heatmaps', 'Screeners'],
          col3: 'Brokerage'
        }
      }
    }
  },
  zh: {
    nav: {
      home: 'CodeNexus 代码库',
      searchPlaceholder: '搜索脚本、主题、插件...',
      sell: '出售代码',
      marketplace: '市场',
      dashboard: '卖家中心',
      admin: '管理后台',
      theme: '主题',
      login: '登录',
      logout: '退出',
      products: '产品分类',
      allProducts: '所有产品'
    },
    auth: {
      loginTitle: '访问终端',
      registerTitle: '新用户注册',
      email: '电子邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      submitLogin: '身份验证',
      submitRegister: '初始化账户',
      switchLogin: '已有账户？登录',
      switchRegister: '需要访问权限？注册',
      success: '访问已授权'
    },
    hero: {
      tag: '🚀 源代码交易的未来',
      titlePrefix: '极速构建，使用',
      titleSuffix: '优质源代码',
      subtitle: '探索经过审计的高性能代码库。为下一代开发者打造的 3D 可视化交易市场。',
      explore: '探索市场',
      startSelling: '开始销售',
      casinoTitle: '中头奖',
      casinoSubtitle: '优质资产。高回报。零赌博风险。',
      stockTitle: '市场操盘手',
      stockSubtitle: '投资高增长代码库。追踪实时资产表现。'
    },
    stats: {
      instant: '即时交付',
      instantDesc: '自动 Git 授权',
      verified: '代码验证',
      verifiedDesc: '专家审计代码质量',
      seo: 'SEO 优化',
      seoDesc: '瞬间提升排名'
    },
    products: {
      featured: '精选产品',
      filters: ['全部', 'SaaS', '移动端', '加密货币', '人工智能'],
      currency: '¥',
      loadMore: '加载更多产品',
      showing: '显示'
    },
    detail: {
      back: '返回市场',
      sales: '销量',
      createdBy: '作者',
      license: '标准授权',
      buy: '购买并下载',
      secure: '通过 Stripe 安全支付。100% 退款保证。',
      techStack: '技术栈',
      verified: '代码质量已由 CodeNexus 团队验证'
    },
    seo: {
      title: 'AI SEO 优化器',
      subtitle: '利用 Gemini 驱动的元数据生成功能，提升您的源代码曝光率。',
      sourceDetails: '源代码详情',
      projectName: '项目名称',
      projectPlaceholder: '例如：终极电商 React 模板',
      rawDesc: '原始描述',
      descPlaceholder: '在此粘贴您的项目功能草稿、技术栈和优势...',
      generate: '生成 SEO 魔法',
      generating: '优化中...',
      results: '结果将显示在这里',
      analyzing: '正在分析技术栈...',
      keywords: '关键词',
      shareSnippet: '社交分享摘要',
      apply: '应用元数据'
    },
    cart: {
      title: '您的购物车',
      empty: '购物车是空的',
      startShopping: '开始购物',
      total: '总计',
      checkout: '安全结账',
      remove: '移除'
    },
    profile: {
      title: '用户个人资料',
      memberSince: '注册时间',
      purchases: '我的购买',
      settings: '设置',
      logout: '退出登录',
      editProfile: '编辑资料',
      download: '下载'
    },
    admin: {
      title: 'NEXUS OS',
      subtitle: '管理控制台',
      exit: '退出系统',
      connected: '已连接',
      latency: '延迟',
      collapse: '收起菜单',
      expand: '展开菜单',
      menu: {
        overview: '数据总览',
        monitoring: '全球监控',
        products: '产品管理',
        publish: '发布商品',
        orders: '订单分析',
        users: '用户数据',
        system: '系统健康',
        settings: '系统设置'
      },
      widgets: {
        revenue: '总收入',
        activeSessions: '活跃会话',
        serverLoad: '服务器负载',
        threats: '已拦截威胁',
        mapTitle: '全球流量热力图',
        liveLogs: '系统日志',
        topProducts: '热销产品',
        requestRate: '请求速率',
        throughput: '数据吞吐',
        nodes: '活跃节点'
      },
      table: {
        product: '产品名称',
        sales: '销量',
        price: '价格',
        status: '状态',
        user: '用户',
        orderId: '订单号',
        amount: '金额',
        time: '时间',
        action: '操作'
      },
      publish: {
        title: '发布新产品',
        basicInfo: '基本信息',
        productName: '产品名称',
        category: '分类',
        price: '价格',
        description: '产品描述',
        upload: '上传资源',
        dragDrop: '将 ZIP 源码包拖拽至此',
        submit: '确认发布'
      },
      settings: {
        title: '系统配置',
        smtpSection: 'SMTP 邮件配置',
        host: 'SMTP 主机',
        port: 'SMTP 端口',
        user: '用户名',
        pass: '密码',
        chatSection: '客服组件配置',
        welcomeMsg: '欢迎语',
        save: '保存配置',
        paymentSection: '支付网关',
        enablePayment: '开启加密货币支付系统',
        menuSection: '前台菜单管理',
        addMenuItem: '添加菜单项',
        menuLabel: '名称',
        menuLink: '目标 (视图/链接)'
      }
    },
    chat: {
      title: '在线客服',
      subtitle: '当前在线',
      placeholder: '输入消息...',
      send: '发送',
      welcome: '您好！有什么可以帮您构建下一个项目的吗？'
    },
    payment: {
      title: '加密货币支付',
      scan: '扫描二维码',
      amount: '支付金额',
      address: '钱包地址',
      network: '充值网络',
      warning: '请仅发送 USDT (ERC20/TRC20)。发送其他资产可能导致永久丢失。请勿备注任何敏感信息。',
      timeRemaining: '剩余时间',
      confirm: '我已完成支付',
      copy: '复制',
      copied: '已复制',
      expired: '支付会话已过期，请刷新',
      maintenance: '支付系统维护中，请稍后再试。'
    },
    footer: {
      copyright: '© 2024 CodeNexus Inc. 保留所有权利。',
      privacy: '隐私政策',
      terms: '服务条款',
      themes: {
        default: {
          desc: '优质源代码、脚本和插件的高级交易市场。由 AI 驱动。',
          col1: '市场',
          col1Items: ['热门脚本', '新品上架', 'SaaS 套件', '移动应用'],
          col2: '卖家',
          col2Items: ['开始销售', '卖家中心', 'AI SEO 工具', 'API 集成'],
          col3: '连接'
        },
        blockchain: {
          desc: '去中心化市场逻辑。智能合约验证。不可篡改的审计日志。',
          col1: 'DeFi 资产',
          col1Items: ['流动性挖矿', 'DEX 聚合器', '闪电贷机器人'],
          col2: 'NFT 模板',
          col2Items: ['生成艺术', '市场 UI', '铸造 Dapps'],
          col3: 'DAO 工具'
        },
        cybersec: {
          desc: '为性能和安全而生。企业级源代码分发的终极平台。',
          col1: '产品',
          col1Items: ['渗透测试工具', '防火墙脚本', '加密库'],
          col2: '资源',
          col2Items: ['安全审计', '零日漏洞报告', 'CVE 数据库'],
          col3: '法律'
        },
        aurora: {
          desc: '加入全球增长最快的源代码市场。设计精美，专家审计。',
          col1: '平台',
          col1Items: ['市场', '卖家', '定价', '法律'],
          col2: '资源',
          col2Items: ['文档', '博客', '社区', '帮助中心'],
          col3: '公司'
        },
        crimson: {
          desc: '仅限授权人员。安全资产交易平台。需 5 级权限。',
          col1: 'A 区：市场',
          col1Items: ['武器控制', '防御网格', '战术行动'],
          col2: 'B 区：特工',
          col2Items: ['招募', '黑色行动', '现场手册'],
          col3: 'C 区：通讯'
        },
        matrix: {
          desc: '> 连接开发者... > 审计源代码... > 部署资产... // 状态：在线',
          col1: '[目录] 市场',
          col1Items: ['热门脚本.sh', '新品.exe', 'SaaS套件.zip', 'App.apk'],
          col2: '[目录] 用户根',
          col2Items: ['登录_Shell', '仪表盘_Init', 'SEO工具_v2', 'API网关'],
          col3: '[网络] 协议'
        },
        casino: {
          desc: '庄家总是赢，但你也可以。为豪赌客准备的优质资产。',
          col1: '桌面游戏',
          col1Items: ['扑克脚本', '轮盘逻辑', '21点 UI'],
          col2: '老虎机',
          col2Items: ['RNG 引擎', '动画包', '音效'],
          col3: 'VIP 俱乐部'
        },
        stock: {
          desc: '现代开发者的实时资产交易。投资能产生回报的代码。',
          col1: '市场',
          col1Items: ['指数', '外汇机器人', '加密算法'],
          col2: '分析',
          col2Items: ['技术指标', '热力图', '筛选器'],
          col3: '经纪业务'
        }
      }
    }
  }
};
