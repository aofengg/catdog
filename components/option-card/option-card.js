Component({
  properties: {
    label: {
      type: String,
      value: 'A'
    },
    text: {
      type: String,
      value: ''
    },
    selected: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onTap: function () {
      this.triggerEvent('tap')
    }
  }
})
