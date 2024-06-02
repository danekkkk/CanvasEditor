export default function Separator({additionalStyles}: {additionalStyles?: string}) {
  return (
    <hr className={`border-2 border-white-98 ${additionalStyles}`} />
)
}
