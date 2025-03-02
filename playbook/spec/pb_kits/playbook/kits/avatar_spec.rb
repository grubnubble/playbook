# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_avatar/avatar"

RSpec.describe Playbook::PbAvatar::Avatar do
  subject { Playbook::PbAvatar::Avatar }

  it { is_expected.to define_prop(:status) }
  it { is_expected.to define_prop(:image_url) }
  it { is_expected.to define_prop(:image_alt) }
  it {
    is_expected.to define_prop(:name)
      .with_default("")
  }
  it {
    is_expected.to define_enum_prop(:size)
      .with_default("md")
      .with_values("xxs", "xs", "sm", "md", "base", "lg", "xl")
  }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_avatar_kit_size_md"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_avatar_kit_size_md additional_class"
      expect(subject.new(size: "lg").classname).to eq "pb_avatar_kit_size_lg"
    end
  end
end
