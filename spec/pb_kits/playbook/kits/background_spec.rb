# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_background/background"

RSpec.describe Playbook::PbBackground::Background do
  subject { Playbook::PbBackground::Background }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:image_url) }
  it { is_expected.to define_enum_prop(:padding)
                      .with_default("md")
                      .with_values("xs", "sm", "md", "none", "lg", "xl") }
  it { is_expected.to define_enum_prop(:tag)
                      .with_default("div")
                      .with_values("h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div") }
  it { is_expected.to define_enum_prop(:background_color)
                      .with_default("bg_light")
                      .with_values("bg_gradient", "bg_dark", "bg_light", "white") }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_background_kit md bg_light p_md"
      expect(subject.new(background_color: "bg_gradient").classname).to eq "pb_background_kit md bg_gradient p_md"
      expect(subject.new(padding: "xl").classname).to eq "pb_background_kit xl bg_light p_xl"
    end
  end
end
