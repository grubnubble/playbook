# frozen_string_literal: true

# rubocop:disable Style/StringConcatenation
require "action_view"

module Playbook
  module PbSelect
    class Select < Playbook::KitBase
      prop :blank_selection
      prop :compact, type: Playbook::Props::Boolean, default: false
      prop :disabled, type: Playbook::Props::Boolean, default: false
      prop :error
      prop :include_blank
      prop :inline, type: Playbook::Props::Boolean, default: false
      prop :label
      prop :multiple, type: Playbook::Props::Boolean, default: false
      prop :name
      prop :onchange
      prop :options, type: Playbook::Props::HashArray, required: false, default: []
      prop :required, type: Playbook::Props::Boolean, default: false

      def classnames
        classname + inline_class + compact_class
      end

      def classname
        generate_classname("pb_select", select_margin_bottom, separator: " ")
      end

      def inline_class
        inline ? " inline " : " "
      end

      def compact_class
        compact ? "compact" : ""
      end

      def select_wrapper_class
        "pb_select_kit_wrapper" + error_class
      end

      def select_margin_bottom
        margin.present? || margin_bottom.present? ? nil : "mb_sm"
      end

      def options_to_array
        options.map { |option| [option[:value_text] || option[:value], option[:value]] }
      end

      def selected
        selections = options.map { |option| option[:value] if option[:selected] == true }.compact
        if selections.empty?
          nil
        else
          selections
        end
      end

      def disabled_options
        disabled_options = options.map { |option| option[:value] if option[:disabled] == true }.compact
        if disabled_options.empty?
          nil
        else
          disabled_options
        end
      end

    private

      def error_class
        error ? " error" : ""
      end
    end
  end
end

# rubocop:enable Style/StringConcatenation
